package com.residencial.residencial.service;

import com.residencial.residencial.model.dto.HabitacionDTO;
import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import com.residencial.residencial.repository.HabitacionRepository;
import com.residencial.residencial.service.impl.HabitacionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HabitacionServiceTests {

    @Mock
    private HabitacionRepository repository;

    @InjectMocks
    private HabitacionServiceImpl service;

    private Habitacion h1, h2;

    @BeforeEach
    void setUp() {
        h1 = Habitacion.builder()
                .numero("101").tipo(TipoHabitacion.ESTANDAR)
                .estado(EstadoHabitacion.DISPONIBLE)
                .precioPorBloque(new BigDecimal("50.00")).build();
        
        h2 = Habitacion.builder()
                .numero("102").tipo(TipoHabitacion.ESTANDAR)
                .estado(EstadoHabitacion.DISPONIBLE)
                .precioPorBloque(new BigDecimal("50.00")).build();
    }

    @Test
    @DisplayName("CP-01: Buscar con fecha válida y tipo disponible debe retornar lista")
    void testConsultarDisponibilidad_Success() {
        when(repository.findByEstadoAndTipo(EstadoHabitacion.DISPONIBLE, TipoHabitacion.ESTANDAR))
                .thenReturn(Arrays.asList(h1, h2));

        List<HabitacionDTO> results = service.consultarDisponibilidad(TipoHabitacion.ESTANDAR, LocalDate.now());

        assertNotNull(results);
        assertEquals(2, results.size());
        assertEquals("101", results.get(0).getNumero());
    }

    @Test
    @DisplayName("CP-02: Buscar con fecha menor a la actual debe lanzar excepción")
    void testConsultarDisponibilidad_InvalidDate() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.consultarDisponibilidad(TipoHabitacion.ESTANDAR, yesterday);
        });

        assertEquals("La fecha de ingreso no puede ser anterior a la fecha actual.", exception.getMessage());
        verify(repository, never()).findByEstadoAndTipo(any(), any());
    }

    @Test
    @DisplayName("CP-03: Sin disponibilidad debe retornar lista vacía")
    void testConsultarDisponibilidad_NoResources() {
        when(repository.findByEstadoAndTipo(EstadoHabitacion.DISPONIBLE, TipoHabitacion.VIP))
                .thenReturn(List.of());

        List<HabitacionDTO> results = service.consultarDisponibilidad(TipoHabitacion.VIP, LocalDate.now());

        assertTrue(results.isEmpty());
    }
}
