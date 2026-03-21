package com.residencial.residencial.service.impl;

import com.residencial.residencial.model.entity.Pago;
import com.residencial.residencial.model.entity.Reserva;
import com.residencial.residencial.model.enums.MetodoPago;
import com.residencial.residencial.repository.PagoRepository;
import com.residencial.residencial.repository.ReservaRepository;
import com.residencial.residencial.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;
    private final ReservaRepository reservaRepository;

    @Override
    @Transactional
    public Pago registrarPago(Long reservaId, BigDecimal monto, MetodoPago metodo) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada con ID: " + reservaId));

        if (monto.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto debe ser mayor a 0.");
        }

        Pago pago = Pago.builder()
                .reserva(reserva)
                .monto(monto)
                .metodo(metodo)
                .fecha(LocalDateTime.now())
                .build();

        return pagoRepository.save(pago);
    }

    @Override
    public List<Pago> obtenerPagosPorReserva(Long reservaId) {
        return pagoRepository.findByReservaId(reservaId);
    }
}
