/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.controladores;

import com.app.tattoo.entidades.Tatuaje;
import com.app.tattoo.servicios.CalendarioServicio;
import com.app.tattoo.servicios.TatuajeServicio;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/admin")
public class AdminControlador {
    
    @Autowired
    private CalendarioServicio calserv;
    
    @Autowired
    private TatuajeServicio tatserv;
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard.html";
    }
    
    @GetMapping("/verAgendados")
    public String verAgendados(ModelMap modelo) {
        List<Tatuaje> tatuajes = tatserv.buscarTodosTatuajes();
        modelo.addAttribute("tatuajes", tatuajes);
        return "verAgendados.html";
    }
    
    @GetMapping("/buscarPorFechaPedido")
    public String buscarPorFechaPedido(ModelMap modelo) {
        List<Tatuaje> tatuajes = tatserv.buscarTatuajesAgrupadosPorFechaPedido();
        modelo.addAttribute("tatuajes", tatuajes);
        return "buscarPorFechaPedido.html";
    }
    
    @GetMapping("/buscarPorFechaTurno")
    public String buscarPorFechaTurno(ModelMap modelo) {
        List<Tatuaje> tatuajes = tatserv.buscarTatuajesAgrupadosPorFechaTurno();
        modelo.addAttribute("tatuajes", tatuajes);
        return "buscarPorFechaTurno.html";
    }
    
    @PostMapping("/buscarPorFechaPedido_")
    public String buscarPorFechaPedido_(@RequestParam String fechaPedido, ModelMap modelo) {
        List<Tatuaje> tatuajes = tatserv.buscarTatuajesPorFechaPedido(fechaPedido);
        modelo.addAttribute("tatuajes", tatuajes);
        return "verAgendados.html";
    }
    
    @PostMapping("/buscarPorFechaTurno_")
    public String buscarPorFechaTurno_(@RequestParam String fechaTurno, ModelMap modelo) {
        List<Tatuaje> tatuajes = tatserv.buscarTatuajesPorFechaTurno(fechaTurno);
        modelo.addAttribute("tatuajes", tatuajes);
        return "verAgendados.html";
    }
}
