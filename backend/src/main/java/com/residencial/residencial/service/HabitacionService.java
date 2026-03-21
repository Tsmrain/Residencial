package com.residencial.residencial.service;

import com.residencial.residencial.model.dto.HabitacionDTO;
import com.residencial.residencial.model.enums.TipoHabitacion;

import java.time.LocalDate;
import java.util.List;

public interface HabitacionService {
    List<HabitacionDTO> consultarDisponibilidad(TipoHabitacion tipo, LocalDate fecha);
}
