/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.repositorios;

import com.app.tattoo.entidades.Tatuaje;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TatuajeRepositorio extends JpaRepository<Tatuaje, String> {
    
    @Query("SELECT t FROM Tatuaje t WHERE t.fechaPedido LIKE %:fechaPedido%")
    public List<Tatuaje> buscarTatuajesPorFechaPedido(@Param("fechaPedido") String fechaPedido);
    
    @Query("SELECT t FROM Tatuaje t WHERE t.fechaTurno LIKE %:fechaTurno%")
    public List<Tatuaje> buscarTatuajesPorFechaTurno(@Param("fechaTurno") String fechaTurno);
    
    @Query("SELECT t FROM Tatuaje t GROUP BY fechaPedido")
    public List<Tatuaje> buscarTatuajesAgrupadosPorFechaPedido();
    
    @Query("SELECT t FROM Tatuaje t GROUP BY fechaTurno")
    public List<Tatuaje> buscarTatuajesAgrupadosPorFechaTurno();
    
}
