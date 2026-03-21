package com.residencial.residencial.controller;

import com.residencial.residencial.model.dto.HabitacionDTO;
import com.residencial.residencial.model.enums.TipoHabitacion;
import com.residencial.residencial.service.HabitacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/disponibilidad")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para desarrollo
public class DisponibilidadController {

    private final HabitacionService habitacionService;

    @GetMapping
    public ResponseEntity<?> consultar(
            @RequestParam TipoHabitacion tipo,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        
        try {
            List<HabitacionDTO> resultados = habitacionService.consultarDisponibilidad(tipo, fecha);
            return ResponseEntity.ok(resultados);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
