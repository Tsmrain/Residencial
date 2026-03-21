package com.residencial.residencial.model.dto;

import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class HabitacionDTO {
    private Long id;
    private String numero;
    private TipoHabitacion tipo;
    private EstadoHabitacion estado;
    private BigDecimal precioPorBloque;
    private String horarioDisponible; // Placeholder or based on logic if needed
}
