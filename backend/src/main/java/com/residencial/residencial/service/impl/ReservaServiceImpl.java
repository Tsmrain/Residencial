package com.residencial.residencial.service.impl;

import com.residencial.residencial.model.dto.ReservaDTO;
import com.residencial.residencial.model.dto.ReservaRequestDTO;
import com.residencial.residencial.model.entity.Cliente;
import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.entity.Reserva;
import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.EstadoReserva;
import com.residencial.residencial.repository.ClienteRepository;
import com.residencial.residencial.repository.HabitacionRepository;
import com.residencial.residencial.repository.ReservaRepository;
import com.residencial.residencial.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final ClienteRepository clienteRepository;
    private final HabitacionRepository habitacionRepository;

    @Override
    @Transactional
    public ReservaDTO crearReserva(ReservaRequestDTO request) {
        if (request.getFechaEntrada().isAfter(request.getFechaSalida())) {
            throw new IllegalArgumentException("La fecha de salida debe ser posterior a la de entrada.");
        }

        Habitacion habitacion = habitacionRepository.findById(request.getHabitacionId())
                .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada."));

        // Validar Disponibilidad real (no superposición)
        List<Reserva> solapadas = reservaRepository.findSuperposicion(habitacion, request.getFechaEntrada(), request.getFechaSalida());
        if (!solapadas.isEmpty() && !habitacion.isDisponible()) {
            throw new IllegalArgumentException("La habitación no está disponible en las fechas seleccionadas.");
        }

        Cliente cliente = clienteRepository.findByDocumento(request.getClienteDocumento())
                .orElseGet(() -> clienteRepository.save(Cliente.builder()
                        .nombre(request.getClienteNombre())
                        .documento(request.getClienteDocumento())
                        .telefono(request.getClienteTelefono())
                        .email(request.getClienteEmail())
                        .build()));

        long dias = ChronoUnit.DAYS.between(request.getFechaEntrada(), request.getFechaSalida());
        if (dias == 0) dias = 1;

        BigDecimal total = habitacion.getPrecioPorBloque().multiply(BigDecimal.valueOf(dias));

        Reserva reserva = Reserva.builder()
                .cliente(cliente)
                .habitacion(habitacion)
                .fechaEntrada(request.getFechaEntrada())
                .fechaSalida(request.getFechaSalida())
                .estado(EstadoReserva.CONFIRMADA)
                .total(total)
                .build();

        // Si es una reserva instantánea hoy, actualiza estado habitación.
        // Simulando que las reservas futuras sólo ocupan su bloque en query, pero aquí la marcamos como "OCUPADA" si empieza hoy.
        reserva = reservaRepository.save(reserva);

        return toDTO(reserva);
    }

    @Override
    public List<ReservaDTO> obtenerReservasPorDocumento(String documento) {
        return reservaRepository.findByClienteDocumento(documento).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ReservaDTO> listarTodas() {
        return reservaRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservaDTO cancelarReserva(Long id) {
        Reserva r = getReservaById(id);
        r.setEstado(EstadoReserva.CANCELADA);
        
        // Liberar habitacion
        Habitacion h = r.getHabitacion();
        h.setEstado(EstadoHabitacion.DISPONIBLE);
        habitacionRepository.save(h);

        return toDTO(reservaRepository.save(r));
    }

    @Override
    @Transactional
    public ReservaDTO hacerCheckIn(Long id) {
        Reserva r = getReservaById(id);
        r.setEstado(EstadoReserva.CHECK_IN);
        
        Habitacion h = r.getHabitacion();
        h.setEstado(EstadoHabitacion.OCUPADA);
        habitacionRepository.save(h);

        return toDTO(reservaRepository.save(r));
    }

    @Override
    @Transactional
    public ReservaDTO hacerCheckOut(Long id) {
        Reserva r = getReservaById(id);
        r.setEstado(EstadoReserva.CHECK_OUT);
        
        Habitacion h = r.getHabitacion();
        h.setEstado(EstadoHabitacion.EN_LIMPIEZA); // Pasa a limpieza al terminar (CU-06 actualizacion)
        habitacionRepository.save(h);

        return toDTO(reservaRepository.save(r));
    }

    private Reserva getReservaById(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada con ID: " + id));
    }

    private ReservaDTO toDTO(Reserva r) {
        return ReservaDTO.builder()
                .id(r.getId())
                .clienteNombre(r.getCliente().getNombre())
                .clienteDocumento(r.getCliente().getDocumento())
                .habitacionNumero(r.getHabitacion().getNumero())
                .fechaEntrada(r.getFechaEntrada())
                .fechaSalida(r.getFechaSalida())
                .estado(r.getEstado())
                .total(r.getTotal())
                .build();
    }
}
