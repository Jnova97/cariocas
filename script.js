var jugadores = [];
        jugador = {
            id: 0,
            nombre: "",
            puntuacion: 0,
            ronda1: 0,
            ronda2: 0,
            ronda3: 0,
            ronda4: 0,
            ronda5: 0,
            ronda6: 0,
            ronda7: 0,
            ronda8: 0,
            ronda9: 0,
            ronda10: 0
        }
        json = "";
        puntuaciones = [];
        //crear una funcion que reciba el nombre del jugador y lo añada a la coleccion cuando se presiona el boton "nuevoJugador"
        function nuevoJugador() {
            jugador.id = jugadores.length;
            jugador.nombre = document.getElementById("nombre").value;
            jugador.id = parseInt(jugadores.length);
            jugadores.push(jugador);
            M.toast({
                html: 'Jugador ' + jugador.nombre + ' añadido',
                classes: 'rounded green lighten-2 black-text'
            });
            document.getElementById("nombre").value = "";
            jugador = {
                id: 0,
                nombre: "",
                puntuacion: 0,
                ronda1: 0,
                ronda2: 0,
                ronda3: 0,
                ronda4: 0,
                ronda5: 0,
                ronda6: 0,
                ronda7: 0,
                ronda8: 0,
                ronda9: 0,
                ronda10: 0
            }
            cargar();

        }


        function comenzar() {
            if (jugadores.length != 0) {
                document.getElementById("añadir").style.display = "none";
                thead = document.getElementById("thead");
                var str = "<tr><th>Rondas</th>";
                jugadores.forEach(function (jugador) {
                    str += "<th>" + jugador.nombre + "</th>";
                });
                thead.innerHTML = str + "</tr>";
                for (var r = 1; r <= 10; r++) {
                    var ronda = document.getElementById("ronda" + r);
                    str = ronda.cells[0].outerHTML;
                    jugadores.forEach(function (jugador) {
                        str += "<td><input type='number' id=' ronda" + r + "jugador" + jugador.id + "' onchange=calcular() value=0></td>";
                    });
                    ronda.innerHTML = str;
                }
                document.getElementById("divPartida").style.visibility = "visible";
            } else {
                alert("No hay jugadores");
            }
        }
        function calcular() {
            jugadores.forEach(function (jugador) {
                jugador.puntuacion = 0;
                jugador.ronda1 = parseInt(document.getElementById(" ronda1jugador" + jugador.id).value);
                jugador.ronda2 = parseInt(document.getElementById(" ronda2jugador" + jugador.id).value);
                jugador.ronda3 = parseInt(document.getElementById(" ronda3jugador" + jugador.id).value);
                jugador.ronda4 = parseInt(document.getElementById(" ronda4jugador" + jugador.id).value);
                jugador.ronda5 = parseInt(document.getElementById(" ronda5jugador" + jugador.id).value);
                jugador.ronda6 = parseInt(document.getElementById(" ronda6jugador" + jugador.id).value);
                jugador.ronda7 = parseInt(document.getElementById(" ronda7jugador" + jugador.id).value);
                jugador.ronda8 = parseInt(document.getElementById(" ronda8jugador" + jugador.id).value);
                jugador.ronda9 = parseInt(document.getElementById(" ronda9jugador" + jugador.id).value);
                jugador.ronda10 = parseInt(document.getElementById(" ronda10jugador" + jugador.id).value);
                jugador.puntuacion = jugador.ronda1 + jugador.ronda2 + jugador.ronda3 + jugador.ronda4 + jugador.ronda5 + jugador.ronda6 + jugador.ronda7 + jugador.ronda8 + jugador.ronda9 + jugador.ronda10;

            });
            document.getElementById("p").innerHTML="";
            jugadores.forEach(j => {
                document.getElementById("p").innerHTML += j.nombre + ": " + j.puntuacion;
                if (j.id != jugadores[jugadores.length - 1].id) {
                    document.getElementById("p").innerHTML += ", ";
                }
            });
            //guardar en un session el array "jugadores" en formato json
            guardar();
        }
        function guardar() {
            localStorage.setItem("jugadores", JSON.stringify(jugadores));
            M.toast({
                html: 'partida guardada',
                classes: 'rounded green lighten-2 black-text'
            });
        }
        function eliminar(id) {
            for (let i = 0; i < jugadores.length; i++) {
                if (jugadores[i].id == id) {
                    M.toast({
                        html: 'Jugador ' + jugadores[i].nombre + ' ha sido eliminado',
                        classes: 'rounded red lighten-2 black-text'
                    });
                    jugadores.splice(i, 1);
                }
            }
            cargar();
        }
        function cargar() {
            document.getElementById("jugadoresDiv").innerHTML = "";
            document.getElementById("p").innerHTML = "";

            jugadores.forEach(j => {
                document.getElementById("jugadoresDiv").innerHTML += "<li class='collection-item'>" + j.nombre + "<a onclick=\"eliminar(" + j.id + ")\" class=\"secondary-content\"><i class=\"material-icons\">delete</i></a></li>";
                document.getElementById("p").innerHTML += j.nombre + ": " + j.puntuacion;
                if (j.id != jugadores[jugadores.length - 1].id) {
                    document.getElementById("p").innerHTML += ", ";
                }
            });
        }
        function load() {
            encontrada = false;
            //verificar si se encontro el array "jugadores" en el sessionStorage y si es asi generar un boolean encontrada
            if (localStorage.getItem("jugadores") != null) {
                encontrada = true;
            }
            //emitir una alerta de partida guardada si encontrada es true y preguntar si se desea cargar la partida
            if (encontrada) {
                if (confirm("¿Desea cargar la partida?")) {

                    jugadores = JSON.parse(localStorage.getItem("jugadores"));
                    cargar();
                    comenzar();
                    jugadores.forEach(function (jugador) {
                        jugador.puntuacion = 0;
                        document.getElementById(" ronda1jugador" + jugador.id).value = jugador.ronda1;
                        document.getElementById(" ronda2jugador" + jugador.id).value = jugador.ronda2;
                        document.getElementById(" ronda3jugador" + jugador.id).value = jugador.ronda3;
                        document.getElementById(" ronda4jugador" + jugador.id).value = jugador.ronda4;
                        document.getElementById(" ronda5jugador" + jugador.id).value = jugador.ronda5;
                        document.getElementById(" ronda6jugador" + jugador.id).value = jugador.ronda6;
                        document.getElementById(" ronda7jugador" + jugador.id).value = jugador.ronda7;
                        document.getElementById(" ronda8jugador" + jugador.id).value = jugador.ronda8;
                        document.getElementById(" ronda9jugador" + jugador.id).value = jugador.ronda9;
                        document.getElementById(" ronda10jugador" + jugador.id).value = jugador.ronda10;
                        jugador.puntuacion = jugador.ronda1 + jugador.ronda2 + jugador.ronda3 + jugador.ronda4 + jugador.ronda5 + jugador.ronda6 + jugador.ronda7 + jugador.ronda8 + jugador.ronda9 + jugador.ronda10;

                    });
                    document.getElementById("p").innerHTML = "";
                    jugadores.forEach(j => {
                        document.getElementById("p").innerHTML += j.nombre + ": " + j.puntuacion;
                        if (j.id != jugadores[jugadores.length - 1].id) {
                            document.getElementById("p").innerHTML += ", ";
                        }
                    });
                    M.toast({
                        html: 'Partida cargada',
                        classes: 'rounded green accent-4 '
                    });
                } else {
                    if (confirm("¿Desea eliminar la partida?")) {
                        localStorage.removeItem("jugadores");
                        document.getElementById("nombre").focus();
                        M.toast({
                            html: 'Partida eliminada',
                            classes: 'rounded red lighten-2 black-text'
                        });

                    }
                }

            }
        }



