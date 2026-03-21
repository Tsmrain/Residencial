package com.residencial.residencial.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropiedadDTO {
    private Long id;

    @NotBlank(message = "El numero es obligatorio")
    private String numero;

    private String bloque;

    @NotBlank(message = "El propietario es obligatorio")
    private String propietario;
}
