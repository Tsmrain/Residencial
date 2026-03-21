package com.residencial.residencial.model.dto;

import com.residencial.residencial.model.enums.EstadoReserva;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class ReservaDTO {
    private Long id;
    private String clienteNombre;
    private String clienteDocumento;
    private String habitacionNumero;
    private LocalDate fechaEntrada;
    private LocalDate fechaSalida;
    private EstadoReserva estado;
    private BigDecimal total;
}
