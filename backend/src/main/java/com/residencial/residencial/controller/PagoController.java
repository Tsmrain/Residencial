package com.residencial.residencial.controller;

import com.residencial.residencial.model.entity.Pago;
import com.residencial.residencial.model.enums.MetodoPago;
import com.residencial.residencial.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para desarrollo
public class PagoController {

    private final PagoService pagoService;

    @PostMapping("/{reservaId}")
    public ResponseEntity<?> registrarPago(
            @PathVariable Long reservaId,
            @RequestBody Map<String, Object> body) {
        try {
            BigDecimal monto = new BigDecimal(body.get("monto").toString());
            MetodoPago metodo = MetodoPago.valueOf(body.get("metodo").toString());
            
            Pago pago = pagoService.registrarPago(reservaId, monto, metodo);
            return ResponseEntity.ok(pago);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{reservaId}")
    public ResponseEntity<List<Pago>> obtenerPagos(@PathVariable Long reservaId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorReserva(reservaId));
    }
}
