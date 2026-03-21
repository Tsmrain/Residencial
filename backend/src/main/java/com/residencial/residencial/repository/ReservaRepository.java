package com.residencial.residencial.repository;

import com.residencial.residencial.model.entity.Habitacion;
import com.residencial.residencial.model.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    // Validar si una habitación está ocupada en un rango de fechas.
    @Query("SELECT r FROM Reserva r WHERE r.habitacion = :habitacion " +
           "AND r.estado IN ('PENDIENTE', 'CONFIRMADA', 'CHECK_IN') " +
           "AND ((r.fechaEntrada <= :salida AND r.fechaSalida >= :entrada))")
    List<Reserva> findSuperposicion(
            @Param("habitacion") Habitacion habitacion,
            @Param("entrada") LocalDate entrada,
            @Param("salida") LocalDate salida);

    List<Reserva> findByClienteDocumento(String documento);
}
