package com.residencial.residencial.repository;

import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.enums.EstadoHabitacion;
import com.residencial.residencial.model.enums.TipoHabitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    List<Habitacion> findByEstadoAndTipo(EstadoHabitacion estado, TipoHabitacion tipo);
}
