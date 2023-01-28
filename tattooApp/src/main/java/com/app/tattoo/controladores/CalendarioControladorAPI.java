/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.controladores;

import com.app.tattoo.entidades.Calendario;
import com.app.tattoo.entidades.Tatuaje;
import com.app.tattoo.servicios.CalendarioServicio;
import com.app.tattoo.servicios.TatuajeServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"*"}, allowedHeaders = {"Authorization", "Origin"}, maxAge = 4800, allowCredentials = "false")
public class CalendarioControladorAPI {
    
    @Autowired
    private CalendarioServicio calserv;
    
    @Autowired
    private TatuajeServicio tatserv;

   @GetMapping("/dias") //me va a devolver en el navegador los calendarios de la base
   public List<Calendario> listarDias() {
       return calserv.listarDias();
   } 
   
   @PostMapping("/actualizarCalendario")
   public ResponseEntity actualizarCalendario (@RequestBody Calendario calendario) {
       calserv.actualizarCalendario(calendario);
       return ResponseEntity.ok(HttpStatus.OK);
   }
   
   @PostMapping("/cargarTatuaje")
   public ResponseEntity cargarTatuaje (@RequestBody Tatuaje tatuaje) {
       tatserv.guardarTatuaje(tatuaje);
       return ResponseEntity.ok(HttpStatus.OK);
   }
}
