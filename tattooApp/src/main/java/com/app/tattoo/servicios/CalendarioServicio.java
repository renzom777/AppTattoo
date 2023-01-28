/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.servicios;

import com.app.tattoo.entidades.Calendario;
import com.app.tattoo.repositorios.CalendarioRepositorio;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarioServicio {
    
    @Autowired
    private CalendarioRepositorio calrepo;
    
    public static Comparator<Calendario> compararFecha = new Comparator<Calendario>() {
        @Override
        public int compare(Calendario c1, Calendario c2) {
            return c1.getDia().compareTo(c2.getDia());
        }
    };
    
    public List<Calendario> listarDias() {
        List<Calendario> calendarios = calrepo.findAll();
        calendarios.sort(compararFecha);
        return calendarios;
    }
    
    public void actualizarCalendario(Calendario calendario) {
       
        Optional<Calendario> respuesta;
        respuesta = calrepo.findById(calendario.getId());
        if (respuesta.isPresent()) {
            Calendario cal = respuesta.get();
            calrepo.delete(cal);
            calrepo.save(calendario);
        }
    }
}
