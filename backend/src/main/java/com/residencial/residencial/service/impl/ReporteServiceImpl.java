package com.residencial.residencial.service.impl;

import com.residencial.residencial.model.entity.Pago;
import com.residencial.residencial.model.entity.Reserva;
import com.residencial.residencial.repository.HabitacionRepository;
import com.residencial.residencial.repository.PagoRepository;
import com.residencial.residencial.repository.ReservaRepository;
import com.residencial.residencial.service.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReporteServiceImpl implements ReporteService {

    private final ReservaRepository reservaRepository;
    private final PagoRepository pagoRepository;
    private final HabitacionRepository habitacionRepository;

    @Override
    public Map<String, Object> generarReportePorTurno(LocalDate fecha) {
        // En una app real filtraríamos por fecha y hora exacta del turno.
        // Aquí tomamos todas las reservas de un día como proxy del turno.
        
        List<Reserva> reservasHoy = reservaRepository.findAll().stream()
                .filter(r -> r.getFechaEntrada().equals(fecha) || r.getFechaSalida().equals(fecha))
                .collect(Collectors.toList());

        BigDecimal ingresos = pagoRepository.findAll().stream()
                .filter(p -> p.getFecha().toLocalDate().equals(fecha))
                .map(Pago::getMonto)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long checkIns = reservasHoy.stream().filter(r -> r.getEstado().name().equals("CHECK_IN")).count();
        long cancelaciones = reservaRepository.findAll().stream().filter(r -> r.getEstado().name().equals("CANCELADA")).count();

        Map<String, Object> reporte = new HashMap<>();
        reporte.put("fecha_turno", fecha.toString());
        reporte.put("ingresos_totales", ingresos);
        reporte.put("checkins_realizados", checkIns);
        reporte.put("cancelaciones", cancelaciones);
        reporte.put("reservas_activas", reservasHoy.size());

        return reporte;
    }

    @Override
    public Map<String, Object> generarReporteConsolidado(LocalDate fechaInicio, LocalDate fechaFin) {
        
        BigDecimal ingresosTotales = pagoRepository.findAll().stream()
                .filter(p -> !p.getFecha().toLocalDate().isBefore(fechaInicio) && !p.getFecha().toLocalDate().isAfter(fechaFin))
                .map(Pago::getMonto)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalHabitaciones = habitacionRepository.count();
        long reservasTotales = reservaRepository.findAll().stream()
                .filter(r -> !r.getFechaEntrada().isBefore(fechaInicio) && !r.getFechaEntrada().isAfter(fechaFin))
                .count();

        Map<String, Object> reporte = new HashMap<>();
        reporte.put("periodo", fechaInicio + " al " + fechaFin);
        reporte.put("ingresos_totales", ingresosTotales);
        reporte.put("reservas_totales", reservasTotales);
        reporte.put("habitaciones_inventario", totalHabitaciones);

        return reporte;
    }
}
