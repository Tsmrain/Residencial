package com.residencial.residencial.service;

import com.residencial.residencial.model.dto.PropiedadDTO;
import java.util.List;

public interface PropiedadService {
    PropiedadDTO crearPropiedad(PropiedadDTO propiedadDTO);
    List<PropiedadDTO> listarTodas();
    PropiedadDTO obtenerPorId(Long id);
    void eliminarPropiedad(Long id);
}
