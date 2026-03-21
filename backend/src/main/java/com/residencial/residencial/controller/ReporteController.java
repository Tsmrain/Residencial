package com.residencial.residencial.controller;

import com.residencial.residencial.service.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para desarrollo
public class ReporteController {

    private final ReporteService reporteService;

    @GetMapping("/turno")
    public ResponseEntity<Map<String, Object>> reporteTurno(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(reporteService.generarReportePorTurno(fecha));
    }

    @GetMapping("/consolidado")
    public ResponseEntity<Map<String, Object>> reporteConsolidado(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        return ResponseEntity.ok(reporteService.generarReporteConsolidado(fechaInicio, fechaFin));
    }
}
