package com.residencial.residencial.service.impl;

import com.residencial.residencial.model.dto.PropiedadDTO;
import com.residencial.residencial.model.entity.Propiedad;
import com.residencial.residencial.repository.PropiedadRepository;
import com.residencial.residencial.service.PropiedadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropiedadServiceImpl implements PropiedadService {

    private final PropiedadRepository repository;

    @Override
    public PropiedadDTO crearPropiedad(PropiedadDTO dto) {
        Propiedad propiedad = Propiedad.builder()
                .numero(dto.getNumero())
                .bloque(dto.getBloque())
                .propietario(dto.getPropietario())
                .build();
        repository.save(propiedad);
        dto.setId(propiedad.getId());
        return dto;
    }

    @Override
    public List<PropiedadDTO> listarTodas() {
        return repository.findAll().stream()
                .map(p -> PropiedadDTO.builder()
                        .id(p.getId())
                        .numero(p.getNumero())
                        .bloque(p.getBloque())
                        .propietario(p.getPropietario())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public PropiedadDTO obtenerPorId(Long id) {
        Propiedad p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));
        return PropiedadDTO.builder()
                .id(p.getId())
                .numero(p.getNumero())
                .bloque(p.getBloque())
                .propietario(p.getPropietario())
                .build();
    }

    @Override
    public void eliminarPropiedad(Long id) {
        repository.deleteById(id);
    }
}
