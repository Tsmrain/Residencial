package com.residencial.residencial.config;

import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import com.residencial.residencial.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final HabitacionRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            log.info("Inicializando datos de prueba para habitaciones...");
            
            repository.saveAll(Arrays.asList(
                    Habitacion.builder().numero("101").tipo(TipoHabitacion.ESTANDAR).estado(EstadoHabitacion.DISPONIBLE).precioPorBloque(new BigDecimal("50.00")).build(),
                    Habitacion.builder().numero("102").tipo(TipoHabitacion.ESTANDAR).estado(EstadoHabitacion.DISPONIBLE).precioPorBloque(new BigDecimal("50.00")).build(),
                    Habitacion.builder().numero("201").tipo(TipoHabitacion.VIP).estado(EstadoHabitacion.DISPONIBLE).precioPorBloque(new BigDecimal("100.00")).build(),
                    Habitacion.builder().numero("202").tipo(TipoHabitacion.VIP).estado(EstadoHabitacion.OCUPADA).precioPorBloque(new BigDecimal("100.00")).build(),
                    Habitacion.builder().numero("301").tipo(TipoHabitacion.SUPER_VIP).estado(EstadoHabitacion.DISPONIBLE).precioPorBloque(new BigDecimal("200.00")).build(),
                    Habitacion.builder().numero("302").tipo(TipoHabitacion.SUPER_VIP).estado(EstadoHabitacion.EN_LIMPIEZA).precioPorBloque(new BigDecimal("200.00")).build()
            ));
            
            log.info("Habitaciones inicializadas con éxito.");
        }
    }
}
