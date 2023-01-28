/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.tattoo.entidades;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@NoArgsConstructor
@Data
public class Tatuaje implements Serializable {
    
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private int precio;
    private int tiempo;
    private String fechaPedido;
    private String fechaTurno;
    private String horarioInicial;
    private String horarioFinal;
    private int senia;
    private String pagoSenia;
    private String nombreCliente;
    private long telefonoCliente;
            
    public Tatuaje(int precio, int tiempo, String fechaPedido, String fechaTurno, String horarioInicial, String horarioFinal, int senia,
                    String pagoSenia, String nombreCliente, long telefonoCliente) {
        this.precio = precio;
        this.tiempo = tiempo;
        this.fechaPedido = fechaPedido;
        this.fechaTurno = fechaTurno;
        this.horarioInicial = horarioInicial;
        this.horarioFinal = horarioFinal;
        this.senia = senia;
        this.pagoSenia = pagoSenia;
        this.nombreCliente = nombreCliente;
        this.telefonoCliente = telefonoCliente;
    }
}
