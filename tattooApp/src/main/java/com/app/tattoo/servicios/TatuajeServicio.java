/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.servicios;

import com.app.tattoo.entidades.Tatuaje;
import com.app.tattoo.repositorios.TatuajeRepositorio;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TatuajeServicio {
    
    @Autowired
    private TatuajeRepositorio tatrepo;
    
    public void guardarTatuaje(Tatuaje tatuaje) {
        tatrepo.save(tatuaje);
    }
    
    public List<Tatuaje> buscarTatuajesPorFechaPedido(String fechaPedido) {
        List<Tatuaje> tatuajes = tatrepo.buscarTatuajesPorFechaPedido(fechaPedido);
        return tatuajes;
    }
    
    public List<Tatuaje> buscarTatuajesPorFechaTurno(String fechaTurno) {
        List<Tatuaje> tatuajes = tatrepo.buscarTatuajesPorFechaTurno(fechaTurno);
        return tatuajes;
    }
    
    public List<Tatuaje> buscarTodosTatuajes() {
        List<Tatuaje> tatuajes = tatrepo.findAll();
        return tatuajes;
    }
    
     public List<Tatuaje> buscarTatuajesAgrupadosPorFechaPedido() {
        List<Tatuaje> tatuajes = tatrepo.buscarTatuajesAgrupadosPorFechaPedido();
        return tatuajes;
    }
    
    public List<Tatuaje> buscarTatuajesAgrupadosPorFechaTurno() {
        List<Tatuaje> tatuajes = tatrepo.buscarTatuajesAgrupadosPorFechaTurno();
        return tatuajes;
    }
   
    
}
