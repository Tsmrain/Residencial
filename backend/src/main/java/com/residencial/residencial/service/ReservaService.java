package com.residencial.residencial.service;

import com.residencial.residencial.model.dto.ReservaDTO;
import com.residencial.residencial.model.dto.ReservaRequestDTO;

import java.util.List;

public interface ReservaService {
    ReservaDTO crearReserva(ReservaRequestDTO request);
    List<ReservaDTO> obtenerReservasPorDocumento(String documento);
    List<ReservaDTO> listarTodas();
    ReservaDTO cancelarReserva(Long id);
    ReservaDTO hacerCheckIn(Long id);
    ReservaDTO hacerCheckOut(Long id);
}
