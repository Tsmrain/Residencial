package com.residencial.residencial.controller;

import com.residencial.residencial.model.dto.ReservaDTO;
import com.residencial.residencial.model.dto.ReservaRequestDTO;
import com.residencial.residencial.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para desarrollo
public class ReservaController {

    private final ReservaService reservaService;

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequestDTO request) {
        try {
            ReservaDTO reserva = reservaService.crearReserva(request);
            return ResponseEntity.ok(reserva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarTodas() {
        return ResponseEntity.ok(reservaService.listarTodas());
    }

    @GetMapping("/cliente/{documento}")
    public ResponseEntity<List<ReservaDTO>> obtenerPorCliente(@PathVariable String documento) {
        return ResponseEntity.ok(reservaService.obtenerReservasPorDocumento(documento));
    }

    @PostMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarReserva(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.cancelarReserva(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/checkin")
    public ResponseEntity<?> checkIn(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.hacerCheckIn(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<?> checkOut(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.hacerCheckOut(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
