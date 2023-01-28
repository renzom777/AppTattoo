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
public class Calendario implements Serializable {
    
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private LocalDate dia;
    private int mediaHora0;
    private int mediaHora1;
    private int mediaHora2;
    private int mediaHora3;
    private int mediaHora4;
    private int mediaHora5;
    private int mediaHora6;
    private int mediaHora7;
    private int mediaHora8;
    private int mediaHora9;
    private int mediaHora10;
    private int mediaHora11;
    private int mediaHora12;
    private int mediaHora13;
    private int mediaHora14;
    private int mediaHora15;
    private int mediaHora16;
    private int mediaHora17;
    
    public Calendario(LocalDate dia, int mediaHora0, int mediaHora1, int mediaHora2, int mediaHora3, int mediaHora4, int mediaHora5, int mediaHora6, int mediaHora7, int mediaHora8,
            int mediaHora9, int mediaHora10, int mediaHora11, int mediaHora12, int mediaHora13, int mediaHora14, int mediaHora15, int mediaHora16, int mediaHora17) {
        this.dia = dia;
        this.mediaHora0 = mediaHora0;
        this.mediaHora1 = mediaHora1;
        this.mediaHora2 = mediaHora2;
        this.mediaHora3 = mediaHora3;
        this.mediaHora4 = mediaHora4;
        this.mediaHora5 = mediaHora5;
        this.mediaHora6 = mediaHora6;
        this.mediaHora7 = mediaHora7;
        this.mediaHora8 = mediaHora8;
        this.mediaHora9 = mediaHora9;
        this.mediaHora10 = mediaHora10;
        this.mediaHora11 = mediaHora11;
        this.mediaHora12 = mediaHora12;
        this.mediaHora13 = mediaHora13;
        this.mediaHora14 = mediaHora14;
        this.mediaHora15 = mediaHora15;
        this.mediaHora16 = mediaHora16;
        this.mediaHora17 = mediaHora17;
    }
    
}
