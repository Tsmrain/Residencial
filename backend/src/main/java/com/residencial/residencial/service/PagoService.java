package com.residencial.residencial.service;

import com.residencial.residencial.model.entity.Pago;
import com.residencial.residencial.model.enums.MetodoPago;

import java.math.BigDecimal;
import java.util.List;

public interface PagoService {
    Pago registrarPago(Long reservaId, BigDecimal monto, MetodoPago metodo);
    List<Pago> obtenerPagosPorReserva(Long reservaId);
}
