package com.residencial.residencial.service.impl;

import com.residencial.residencial.model.dto.HabitacionDTO;
import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import com.residencial.residencial.repository.HabitacionRepository;
import com.residencial.residencial.service.HabitacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HabitacionServiceImpl implements HabitacionService {

    private final HabitacionRepository repository;

    @Override
    public List<HabitacionDTO> consultarDisponibilidad(TipoHabitacion tipo, LocalDate fecha) {
        // En esta etapa preliminar, filtramos por estado DISPONIBLE y tipo.
        // La fecha se valida en el controlador o aquí para que no sea pasada.
        if (fecha.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha de ingreso no puede ser anterior a la fecha actual.");
        }

        List<Habitacion> habitaciones = repository.findByEstadoAndTipo(EstadoHabitacion.DISPONIBLE, tipo);

        return habitaciones.stream()
                .map(h -> HabitacionDTO.builder()
                        .id(h.getId())
                        .numero(h.getNumero())
                        .tipo(h.getTipo())
                        .estado(h.getEstado())
                        .precioPorBloque(h.getPrecioPorBloque())
                        .horarioDisponible("Disponible desde " + LocalDate.now())
                        .build())
                .collect(Collectors.toList());
    }
}
