package com.residencial.residencial.model.entity;

import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "habitaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoHabitacion tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoHabitacion estado;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioPorBloque;

    public boolean isDisponible() {
        return EstadoHabitacion.DISPONIBLE.equals(this.estado);
    }
}
