package com.residencial.residencial.model.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservaRequestDTO {
    // Datos del cliente
    private String clienteNombre;
    private String clienteDocumento;
    private String clienteTelefono;
    private String clienteEmail;

    // Datos de la reserva
    private Long habitacionId;
    private LocalDate fechaEntrada;
    private LocalDate fechaSalida;
}
