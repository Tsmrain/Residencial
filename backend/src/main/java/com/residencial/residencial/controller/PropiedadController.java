package com.residencial.residencial.controller;

import com.residencial.residencial.model.dto.PropiedadDTO;
import com.residencial.residencial.service.PropiedadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propiedades")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para desarrollo local, luego restringir.
public class PropiedadController {

    private final PropiedadService service;

    @PostMapping
    public ResponseEntity<PropiedadDTO> crear(@Valid @RequestBody PropiedadDTO dto) {
        return new ResponseEntity<>(service.crearPropiedad(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PropiedadDTO>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropiedadDTO> porId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminarPropiedad(id);
        return ResponseEntity.noContent().build();
    }
}
