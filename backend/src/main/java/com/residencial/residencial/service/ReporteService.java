package com.residencial.residencial.service;

import java.time.LocalDate;
import java.util.Map;

public interface ReporteService {
    Map<String, Object> generarReportePorTurno(LocalDate fecha);
    Map<String, Object> generarReporteConsolidado(LocalDate fechaInicio, LocalDate fechaFin);
}
