package com.residencial.residencial.repository;

import com.residencial.residencial.model.entity.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Long> {
    Optional<Propiedad> findByNumero(String numero);
}
