// FUNCIONES QUE PERMITEN MOSTRAR LAS OPCIONES DISPONIBLES SEGUN LA SELECCION

function seleccionForma() {
    var opcionesForma = document.getElementsByName("formaTattoo");
    if (opcionesForma[0].checked) {
        var medidasOtro = document.getElementById("medidasOtro");
        if (medidasOtro) {
            medidasOtro.remove();
        }
        if (!document.getElementById("opcionesLineal")) {
            document.getElementById("divInputLineal").insertAdjacentHTML("beforeend",
            `
                                                                    <div id='opcionesLineal' class='opcionesAdicionales'>
                                                                        <div id='opcionesGrosor'>
                                                                            <h3>¿El tattoo tendría más de un grosor?</h3>
                                                                            <div class="inputs">
                                                                                <input type='radio' name='grosor' value='no'> No
                                                                            </div>
                                                                            <div class="inputs">
                                                                                <input type='radio' name='grosor' value='si'> Si
                                                                            </div>
                                                                        </div>
                                                                        <div class='inputsTexto'>
                                                                            <input type='number' id='longitud' placeholder='Ingresá longitud del tattoo en cms'>
                                                                        </div>
                                                                    </div>
                                                                        `);
        }
        
    } else if (opcionesForma[1].checked) {
        var opcionesLineal = document.getElementById("opcionesLineal");
        if (opcionesLineal) {
            opcionesLineal.remove();
        }
        if (!document.getElementById("medidasOtro")) {
            const ingresoMedidas = document.getElementById("divInputOtro").insertAdjacentHTML("beforeend",
                                                                                        `
                                                                                        <div id='medidasOtro' class='opcionesAdicionales'>
                                                                                            <div class='inputsTexto'>
                                                                                                <input type='number' id='largo' placeholder='Ingresá largo del tattoo en cms'>
                                                                                            </div>
                                                                                            <div class='inputsTexto'>
                                                                                                <input type='number' id='ancho' placeholder='Ingresá ancho del tattoo en cms'>
                                                                                            </div>
                                                                                        </div>
                                                                                        `);
        }
    }
}

function seleccionColor() {
    const opcionesColor = document.getElementsByName("color");
    if (opcionesColor[0].checked) {
        if(!document.getElementById("colores")) {
            document.getElementById("divInputColorSi").insertAdjacentHTML("beforeend",
            `
                                                                        <div id='colores' class='opcionesAdicionales'>
                                                                            <h3>Sin contar el negro, ¿cuántos colores llevaría?</h3>
                                                                            <div class="inputs">
                                                                                <input type='radio' name='coloresCantidad' value='uno'> Uno
                                                                            </div>
                                                                            <div class="inputs">
                                                                                <input type='radio' name='coloresCantidad' value='varios'> Más de uno
                                                                            </div>
                                                                        </div>
                                                                        `)
        }
    } else if (opcionesColor[1].checked) {
        if (document.getElementById("colores")) {
            document.getElementById("colores").remove();
        }
    }
}

/**
 * Recorre las opciones y devuelve el valor de la opcion seleccionada en el HTML
 * 
 * @param {[]} arrayOpciones 
 * @return {any} El valor de la opcion seleccionada
 */
function opcionSeleccionada(arrayOpciones) {
    for (let i = 0; i < arrayOpciones.length; i++) {
            if (arrayOpciones[i].checked) {
                var respuestaGrosor = arrayOpciones[i].value;
                return respuestaGrosor;
            }
        }
}

// FUNCIONES QUE PERMITEN LA COTIZACION TOTAL DEL TATUAJE
function cotizacionSegunTipo() {
    var precio = 0;
    var tiempo = 0;
    if (document.getElementById("opcionesLineal")) {
        var respuestasGrosor = document.getElementsByName("grosor");
        var respuestaGrosor = opcionSeleccionada(respuestasGrosor);
        if (respuestaGrosor == "si") {
            precio += 500;
        }
        var longitud = document.getElementById("longitud").value;
        if (longitud >= 7) {
            precio += 500;
            tiempo += 1;
        }
    }
    if (document.getElementById("medidasOtro")) {
        var largo = document.getElementById("largo").value;
        var ancho = document.getElementById("ancho").value;
        if (largo <= 7 && ancho <= 7){
            precio += 0;
            tiempo += 0;
        } else if (largo > 7 && largo <= 15 && ancho > 7 && ancho <= 15) {
            precio += 500;
            tiempo += 1;     
        } else {
            precio += 1000;
            tiempo += 2;
        }
    }

    return {precio: precio, tiempo: tiempo};
}

function cotizacionSegunZona() {
    var precio = 0;
    var tiempo = 0;
    const respuestasZona = document.getElementsByName("zona");
    var respuestaZona = opcionSeleccionada(respuestasZona);
    if (respuestaZona == "interno") {
        precio += 500;
        tiempo += 1;
    }

    return {precio: precio, tiempo: tiempo};
}

function cotizacionSegunColores() {
    var precio = 0;
    var tiempo = 0;
    if (document.getElementsByName("coloresCantidad")) {
        const respuestasColor = document.getElementsByName("coloresCantidad");
        var respuestaColor = opcionSeleccionada(respuestasColor);
        if (respuestaColor == "uno") {
            precio += 500;
            tiempo += 1;
        } else if (respuestaColor == "varios") {
            precio += 1000;
            tiempo += 2;
        }
    }

    return {precio: precio, tiempo: tiempo};
}

function cotizacionSegunDificultad() {
    var precio = 0;
    var tiempo = 0;
    const respuestasDificultad = document.getElementsByName("dificultad");
    var respuestaDificultad = opcionSeleccionada(respuestasDificultad);
    if (respuestaDificultad == "medio") {
        precio += 500;
        tiempo += 1;
    } else if (respuestaDificultad == "alto") {
        precio += 1000;
        tiempo += 2;
    }

    return {precio: precio, tiempo: tiempo};
}

/**
 * Cotiza el tatuaje segun las especificaciones ingresadas y devuelve los valores como atributos de un objeto
 * 
 * @return {{}} Objeto con los valores precio, tiempo y seña resultantes de la cotizacion
 */
function cotizacionTotal() {
    var precioBase = 3500;
    var tiempoBase = 1;  // Tiempo en medias horas; tiempo = 1 = 30 minutos
    
    var valoresCotizacionSegunTipo = cotizacionSegunTipo();
    var precioCotizacionSegunTipo = valoresCotizacionSegunTipo.precio;
    var tiempoCotizacionSegunTipo = valoresCotizacionSegunTipo.tiempo;

    var valoresCotizacionSegunZona = cotizacionSegunZona();
    var precioCotizacionSegunZona = valoresCotizacionSegunZona.precio;
    var tiempoCotizacionSegunZona = valoresCotizacionSegunZona.tiempo;

    var valoresCotizacionSegunColores = cotizacionSegunColores();
    var precioCotizacionSegunColores = valoresCotizacionSegunColores.precio;
    var tiempoCotizacionSegunColores = valoresCotizacionSegunColores.tiempo;

    var valoresCotizacionSegunDificultad = cotizacionSegunDificultad();
    var precioCotizacionSegunDificultad = valoresCotizacionSegunDificultad.precio;
    var tiempoCotizacionSegunDificultad = valoresCotizacionSegunDificultad.tiempo;

    var precioTotal = precioBase + precioCotizacionSegunTipo + precioCotizacionSegunZona + precioCotizacionSegunColores + precioCotizacionSegunDificultad;
    var tiempoTotal = tiempoBase + tiempoCotizacionSegunTipo + tiempoCotizacionSegunZona + tiempoCotizacionSegunColores + tiempoCotizacionSegunDificultad;
    var senia = precioTotal * 0.2;
    
    return {"precio": precioTotal, "tiempo": tiempoTotal, "senia": senia};
}

function volverACotizar() {
    document.getElementById("muestra").style.display = 'none';
    document.getElementById("formularioCotizacion").style.display = 'block';
    if (document.getElementById("turnos")) {
        document.getElementById("turnos").style.display = 'none';
    }
}

/**
 * Actualiza el dia en caso de que el turno disponible sea seleccionado luego
 * 
 * @param {{}} diaParaActualizar 
 * @param {number} indiceInicioTurno 
 * @param {number} indiceFinalizacionDeTurno 
 * 
 * @return {{}} Retorna el dia actualizado
 */
function actualizarDia(diaActual, indiceInicioTurno, indiceFinalizacionDeTurno) {

    for (let cont=indiceInicioTurno; cont<indiceFinalizacionDeTurno; cont++) {
        switch (cont) {
            case 0:
                diaActual.mediaHora0 = 1;
                break;
            case 1:
                diaActual.mediaHora1 = 1;
                break;
            case 2:
                diaActual.mediaHora2 = 1;
                break;
            case 3:
                diaActual.mediaHora3 = 1;
                break;
            case 4:
                diaActual.mediaHora4 = 1;
                break;
            case 5:
                diaActual.mediaHora5 = 1;
                break;
            case 6:
                diaActual.mediaHora6 = 1;
                break;
            case 7:
                diaActual.mediaHora7 = 1;
                break;
            case 8:
                diaActual.mediaHora8 = 1;
                break;
            case 9:
                diaActual.mediaHora9 = 1;
                break;
            case 10:
                diaActual.mediaHora10 = 1;
                break;
            case 11:
                diaActual.mediaHora11 = 1;
                break;
            case 12:
                diaActual.mediaHora12 = 1;
                break;
            case 13:
                diaActual.mediaHora13 = 1;
                break;
            case 14:
                diaActual.mediaHora14 = 1;
                break;
            case 15:
                diaActual.mediaHora15 = 1;
                break;
            case 16:
                diaActual.mediaHora16 = 1;
                break;
            case 17:
                diaActual.mediaHora17 = 1;
                break;
        } 
    }

}

/**
 * 
 * @param {number} indiceInicioTurno 
 * @param {number} tiempoEstimado 
 * @return {{}} Devuelve un objeto con el horario inicial y el horario final del turno disponibles como atributos
 */
function determinarHorarioDeTurnoDisponible(indiceInicioTurno, tiempoEstimado) {

    var horaInicial = 0;
    var minutosInicial = 0;

    switch (indiceInicioTurno) {
        case 0:
            horaInicial = 10;
            minutosInicial = 00;
            break;
        case 1:
            horaInicial = 10;
            minutosInicial = 30;
            break;
        case 2:
            horaInicial = 11;
            minutosInicial = 00;
            break;
        case 3:
            horaInicial = 11;
            minutosInicial = 30;
            break;
        case 4:
            horaInicial = 12;
            minutosInicial = 00;
            break;
        case 5:
            horaInicial = 12;
            minutosInicial = 30;
            break;
        case 6:
            horaInicial = 13;
            minutosInicial = 00;
            break;
        case 7:
            horaInicial = 13;
            minutosInicial = 30;
            break;
        case 8:
            horaInicial = 14;
            minutosInicial = 00;
            break;
        case 9:
            horaInicial = 14;
            minutosInicial = 30;
            break;
        case 10:
            horaInicial = 15;
            minutosInicial = 00;
            break;
        case 11:
            horaInicial = 15;
            minutosInicial = 30;
            break;
        case 12:
            horaInicial = 16;
            minutosInicial = 00;
            break;
        case 13:
            horaInicial = 16;
            minutosInicial = 30;
            break;
        case 14:
            horaInicial = 17;
            minutosInicial = 00;
            break;
        case 15:
            horaInicial = 17;
            minutosInicial = 30;
            break;
        case 16:
            horaInicial = 18;
            minutosInicial = 00;
            break;
    }

    var tiempoEstimadoEnMinutos = tiempoEstimado*30;
    var horaFinal = horaInicial;
    while (tiempoEstimadoEnMinutos >= 60) {
        horaFinal += 1;
        tiempoEstimadoEnMinutos -= 60;
    }
    var minutosFinal = minutosInicial + tiempoEstimadoEnMinutos;
    if (minutosFinal == 60) {
        horaFinal +=1;
        minutosFinal -= 60;
    }
    
    var horarioInicial = horaInicial + ":" + minutosInicial;
    var horarioFinal = horaFinal + ":" + minutosFinal;

    return {horarioInicial: horarioInicial, horarioFinal: horarioFinal};
}

/**
 * Busca los turnos disponibles segun la base de datos, los muestra, permite ingresar datos del cliente y agendar el turno deseado
 */
function turnosDisponibles() {
    document.getElementById("volverACotizar").style.display = 'none';
    document.getElementById("botonTurnosDisponibles").style.display = 'none';

    $.ajax({
        url: 'http://localhost:8080/api/dias',
        type: 'GET',
        dataType: 'json',
        success: function (res) {

            var tiempoEstimado = cotizacionTotal().tiempo;
            var turnosDisponibles = [];
            var idTurno = 0;

            // Busca turnos disponibles
            for (let i = 0; i < res.length; i++) {
                var valores = Object.values(res[i]);
                var valoresDias = valores.slice(2,);

                for (let j = 0; j < valoresDias.length; j++) {
                    var indiceFinalizacionDeTurno = j + tiempoEstimado;
                    if (indiceFinalizacionDeTurno < valoresDias.length) {
                        var posibleTurno = valoresDias.slice(j, indiceFinalizacionDeTurno);
                        var disponible = true;

                        for (let k = 0; k < posibleTurno.length; k++) {
                            if (posibleTurno[k] == 1) {    // En la base de datos 0 representa lugar libre y 1 lugar ocupado
                                disponible = false;
                                break;
                            }
                        }
                        if (disponible) {

                            idTurno += 1;

                            var copiaDiaActual = {id: res[i].id,  
                                dia: res[i].dia,
                                mediaHora0: res[i].mediaHora0,
                                mediaHora1: res[i].mediaHora1,
                                mediaHora2: res[i].mediaHora2,
                                mediaHora3: res[i].mediaHora3,
                                mediaHora4: res[i].mediaHora4,
                                mediaHora5: res[i].mediaHora5,
                                mediaHora6: res[i].mediaHora6,
                                mediaHora7: res[i].mediaHora7,
                                mediaHora8: res[i].mediaHora8,
                                mediaHora9: res[i].mediaHora9,
                                mediaHora10: res[i].mediaHora10,
                                mediaHora11: res[i].mediaHora11,
                                mediaHora12: res[i].mediaHora12,
                                mediaHora13: res[i].mediaHora13,
                                mediaHora14: res[i].mediaHora14,
                                mediaHora15: res[i].mediaHora15,
                                mediaHora16: res[i].mediaHora16,
                                mediaHora17: res[i].mediaHora17
                            }

                            actualizarDia(copiaDiaActual, j, indiceFinalizacionDeTurno);

                            var horariosTurnoDisponible = determinarHorarioDeTurnoDisponible(j, tiempoEstimado);
                            var horarioInicioTurnoDisponible = horariosTurnoDisponible.horarioInicial;
                            var horarioFinalizacionTurnoDisponible = horariosTurnoDisponible.horarioFinal;

                            var turnoDisponible = { idTurno: idTurno, calendario: copiaDiaActual, 
                                                    horarioInicial: horarioInicioTurnoDisponible, horarioFinal: horarioFinalizacionTurnoDisponible };

                            turnosDisponibles.push(turnoDisponible);
                        }
                    }
                }
            }

            let data = '';
            turnosDisponibles.forEach(element => {
                data += `
                        <tr>
                            <td>${element.idTurno}</td>
                            <td>${element.calendario.dia}</td>
                            <td>${element.horarioInicial}</td>
                            <td>${element.horarioFinal}</td>
                        </tr>
                    `
            });

            document.getElementById("turnos").style.display = 'block';
            document.getElementById("noTurnos").style.display = 'none';
            document.getElementById("errorTurnos").style.display = 'none';

            if (turnosDisponibles.length != 0) {
                document.getElementById("turnosDisponibles").innerHTML = `
                                                                        <div class='tituloTurnos'>
                                                                            <h2>Se han encontrado ${turnosDisponibles.length} turnos disponibles</h2>
                                                                        </div>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Id Turno</th>
                                                                                    <th>Dia</th>
                                                                                    <th>Desde</th>
                                                                                    <th>Hasta</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                ${data}
                                                                            </tbody>
                                                                        </table>
                                                                        `
            
            document.getElementById("datosFinales").innerHTML = `
                                                                <div class="eleccion">
                                                                    <h2>Id del turno seleccionado</h2>
                                                                    <input class='inputsTexto' type='number' id='idTurno' placeholder='Id Turno'>
                                                                </div>
                                                                <div class="eleccion">
                                                                    <h2>Código de transferencia de seña</h2>
                                                                    <input class='inputsTexto' type='text' id='pagoSenia' placeholder='Código'>
                                                                    <h3>*Asegurate de escribirlo correctamente. Si no coincide con lo que yo reciba, el turno quedará anulado</h3>
                                                                </div>
                                                                <div class="eleccion">
                                                                    <h2>Tu nombre</h2>
                                                                    <input class='inputsTexto' type='text' id='nombre' placeholder='Nombre'>
                                                                </div>
                                                                <div class="eleccion">
                                                                    <h2>Tu número de teléfono</h2>
                                                                    <input class='inputsTexto' type='text' id='telefono' placeholder='Teléfono'>
                                                                </div>
                                                                <button id='agendar'>¡Agendar!</button>
                                                                `
            } else {
                document.getElementById("noTurnos").style.display = 'block';
                document.getElementById("noTurnos").innerHTML =`
                                                                <div class='tituloTurnos'>
                                                                    <h2>
                                                                        Disculpas, en este momento <span class='datoImportante'>no hay turnos disponibles</span> 
                                                                        para el tatuaje que quieres
                                                                    </h2>
                                                                </div>
                                                                `
            }
            
            
            $("#agendar").on("click", function() {

                var idTurno = document.getElementById("idTurno").value;
                var nombre = document.getElementById("nombre").value;
                var telefono = document.getElementById("telefono").value;
                var pagoSenia = document.getElementById("pagoSenia").value;

                for(let i=0; i<turnosDisponibles.length; i++) {
                    if (turnosDisponibles[i].idTurno == idTurno) {
                        var turnoSeleccionado = turnosDisponibles[i];
                        break;
                    }
                }

                var calendarioAEnviar = turnoSeleccionado.calendario;

                var fechaPedido = new Date();
                var año = fechaPedido.getFullYear();
                var mes = fechaPedido.getMonth()+1;
                var dia = fechaPedido.getDate();
                fechaPedido = `${año}-${mes}-${dia}`;
                var valoresDeCotizacion = cotizacionTotal();
                var precioEstimado = valoresDeCotizacion.precio;
                var tiempoEstimado = valoresDeCotizacion.tiempo;
                var seniaEstimada = valoresDeCotizacion.senia;

                var tatuajeAEnviar = {precio: precioEstimado, 
                                    tiempo: tiempoEstimado, 
                                    fechaPedido: fechaPedido, 
                                    fechaTurno: calendarioAEnviar.dia,
                                    horarioInicial: turnoSeleccionado.horarioInicial,
                                    horarioFinal: turnoSeleccionado.horarioFinal,
                                    senia: seniaEstimada,
                                    pagoSenia: pagoSenia,
                                    nombreCliente: nombre,
                                    telefonoCliente: telefono
                                }

                $.ajax({
                    url: 'http://localhost:8080/api/actualizarCalendario',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(calendarioAEnviar),
                    dataType: 'json',
                    success: (data) => {
                        var exitoCalendario = true;

                        $.ajax({
                            url: 'http://localhost:8080/api/cargarTatuaje',
                            contentType: 'application/json',
                            type: 'POST',
                            data: JSON.stringify(tatuajeAEnviar),
                            dataType: 'json',
                            success: (data) => {
                                var exitoTatuaje = true;

                                if (exitoCalendario && exitoTatuaje) {
                                    document.getElementById("muestra").style.display = 'none';
                                    document.getElementById("turnos").style.display = 'none';
                                    document.getElementById("agendaExitosa").style.display = 'block';
                                    document.getElementById("muestraTurnoAgendado").innerHTML = `
                                                                                        <h2>
                                                                                            <span class='datoImportante' id='exito'>Tu turno se ha agendado exitosamente</span><br>
                                                                                            ¡Gracias por elegirme!<br><br>
                                                                                            Fecha: <span class='datoImportante'>${tatuajeAEnviar.fechaTurno}</span><br>
                                                                                            De: <span class='datoImportante'>${tatuajeAEnviar.horarioInicial} hs 
                                                                                                a ${tatuajeAEnviar.horarioFinal} hs</span><br>
                                                                                            ¡Por favor agendalo y no te olvidés!<br><br>
                                                                                            Dinero restante a abonar el día del turno: 
                                                                                            <span class='datoImportante'>${tatuajeAEnviar.precio-tatuajeAEnviar.senia} pesos</span>
                                                                                            <br><br>
                                                                                            Recordá que de no avisarme con 24 hs de anticipación que no podrás asistir
                                                                                            al turno, <span id='perdidaSenia'>perdés la seña abonada</span><br><br>
                                                                                            ¡Nos vemos!
                                                                                        </h2>

                                                                                        `
                                }
                            }
                        })
                    }
                })
            })
        },
        error: function(jqXHR) {
            document.getElementById("turnos").style.display = 'block';
            if (jqXHR.status == 0) {
                document.getElementById("errorTurnos").innerHTML = 
                                                                `
                                                                <div class='tituloTurnos'>
                                                                    <h2>
                                                                        Disculpas, ha ocurrido un <span class='datoImportante'>error de conexión</span> 
                                                                    </h2>
                                                                </div>
                                                                `
            } else if (jqXHR.status == 404) {
                document.getElementById("errorTurnos").innerHTML = 
                                                                `
                                                                <div class='tituloTurnos'>
                                                                    <h2>
                                                                        <span class='datoImportante'>Error 404</span>. No se pudo encontrar lo solicitado, disculpas.
                                                                    </h2>
                                                                </div>
                                                                `
            } else if (jqXHR.status == 500) {
                document.getElementById("errorTurnos").innerHTML = 
                                                                `
                                                                <div class='tituloTurnos'>
                                                                    <h2>
                                                                        <span class='datoImportante'>Error interno del servidor</span>. Intentaremos solucionarlo en breve, 
                                                                        disculpas.
                                                                    </h2>
                                                                </div>
                                                                `
            }
            document.getElementById("errorTurnos").insertAdjacentHTML("beforeend", `
                                                                <button id='volverACotizar' onclick='volverACotizar()'>Volver al formulario</button>
                                                                <button id='botonTurnosDisponibles' onclick='turnosDisponibles()'>Reintentar</button>
            `)
        }

    })
}

/**
 * Oculta el formulario y muestra la cotizacion, dando luego las opciones para volver a cotizar 
 */
function cotizarYMostrar() {
    
    try {
        validacionDatosTatuaje();
        document.getElementById("formularioCotizacion").style.display = 'none';
        document.getElementById("muestra").style.display = 'block';
        
        var valoresDeCotizacion = cotizacionTotal();
        var precioEstimado = valoresDeCotizacion.precio;
        var tiempoEstimado = valoresDeCotizacion.tiempo;
        var seniaEstimada = valoresDeCotizacion.senia;

        document.getElementById("muestraDeCotizacion").innerHTML = `
                                                                    <div id='muestraDeCotizacion'>
                                                                        <h2>Tu tatuaje te costaría aproximadamente <span class='datoImportante'>${precioEstimado} pesos</span>
                                                                        <br><br>Sheik tardaría aproximadamente <span class='datoImportante'>${tiempoEstimado*30} minutos</span>
                                                                        <br><br>La seña que debes abonar es de <span class='datoImportante'>${seniaEstimada} pesos</span></h2>
                                                                        <button id='volverACotizar'>Volver al formulario</button>
                                                                        <button id='botonTurnosDisponibles'>Ver turnos disponibles</button>
                                                                    </div>
                                                                    `
        
        document.getElementById("volverACotizar").onclick = volverACotizar;
        document.getElementById("botonTurnosDisponibles").onclick = turnosDisponibles;

    } catch (error) {
        alert(error.message);
    }

}

/**
 * Devuelve true o false dependiendo de la validez del numero ingresado
 * @param {number} numero 
 * @return {boolean} Devuelve true si es un numero valido y false si no lo es o no se ingresó nada
 */
function validacionInputsNumero(numero) {
    if (numero != null || numero != undefined) {
        if (numero > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * Valida todos los campos con las caracteristicas necesarias para la cotizacion del tatuaje. Lanza un error si falta algo o no es válido
 */
function validacionDatosTatuaje() {

        const radiosFormaTatto = document.getElementsByName("formaTattoo");
        var validacionFormas = false;
        for (let i=0; i<radiosFormaTatto.length; i++) {
            if (radiosFormaTatto[i].checked) {
                validacionFormas = true;
                break;
            }
        }
        if (validacionFormas == false) {
            throw (new Error("Debes seleccionar la forma"))
        } 

        if (document.getElementById("opcionesLineal")) {
            var validacionGrosor = false;
            const radiosGrosor = document.getElementsByName("grosor");
            for (let i=0; i<radiosGrosor.length; i++) {
                if (radiosGrosor[i].checked) {
                    validacionGrosor = true;
                    break;
                }
            }
            if (validacionGrosor == false) {
                throw (new Error("Debes seleccionar el grosor"))
            }

            var validacionLongitud = validacionInputsNumero(document.getElementById("longitud").value);
            if (validacionLongitud == false) {
                throw (new Error("Debes indicar la longitud"));
            }
        }

        if (document.getElementById("medidasOtro")) {
            var validacionLargo = validacionInputsNumero(document.getElementById("largo").value);
            if (validacionLargo == false) {
                throw (new Error("Debes indicar el largo"));
            }

            var validacionAncho = validacionInputsNumero(document.getElementById("ancho").value);
            if (validacionAncho == false) {
                throw (new Error("Debes indicar el ancho"));
            }
        }

        const radiosZonaTatto = document.getElementsByName("zona");
        var validacionZona = false;
        for (let i=0; i<radiosZonaTatto.length; i++) {
            if (radiosFormaTatto[i].checked) {
                validacionZona = true;
                break;
            }
        }
        if (validacionZona == false) {
            throw (new Error("Debes seleccionar la zona"))
        }

        const radiosColorTatto = document.getElementsByName("color");
        var validacionColor = false;
        for (let i=0; i<radiosColorTatto.length; i++) {
            if (radiosColorTatto[i].checked) {
                validacionColor = true;
                break;
            }
        }
        if (validacionColor == false) {
            throw (new Error("Debes seleccionar el color"))
        }
 
        if (document.getElementById("colores")) {
            var validacionColores = false;
            const radiosColoresCantidad = document.getElementsByName("coloresCantidad");
            for (let i=0; i<radiosColoresCantidad.length; i++) {
                if (radiosColoresCantidad[i].checked) {
                    validacionColores = true;
                    break;
                }
            }
            if (validacionColores == false) {
                throw (new Error("Debes seleccionar la cantidad de colores"))
            }
        }

        const radiosDificultadTatto = document.getElementsByName("dificultad");
        var validacionDificultad = false;
        for (let i=0; i<radiosDificultadTatto.length; i++) {
            if (radiosDificultadTatto[i].checked) {
                validacionDificultad = true;
                break;
            }
        }
        if (validacionDificultad == false) {
            throw (new Error("Debes seleccionar el nivel de detalle y sombreado"))
        }
}

document.getElementById("cotizar").onclick = cotizarYMostrar;