
let nombre = '';
let posicion = '';
let valor = 400000;
let estado = '';
let club = '';

function mostrarjugadores (jugadores){
    jugadores.forEach(jugador => console.log (jugador.nombre + ' - ' + jugador.posicion + ' - ' + jugador.valor + '-' + jugador.nombre + ' - ' + jugador.estado + ' - ' + jugador.club + ' - '))   
    };

    function filtrarjugadores (){
        const resultado = jugadores.filter (filtrarnombre).filter (filtrarposicion).filter (filtrarvalor).filter (filtrarestado).filter (filtrarclub).filter
            if (resultado.length > 0){
                mostrarjugadores (resultado)
            }
            else{
                console.log ('no se ha encontrado el jugador');
            }
        }
    
        function filtrarnombre (jugador){
            if (nombre){
                return jugador.nombre == nombre
            }
            else {
                return jugador
            };

        }
        function filtrarposicion (jugador){
            if (posicion){
                return jugador.posicion == posicion
            }
            else {
                return jugador
            };

        }
        function filtrarvalor (jugador){
            if (valor){
                return jugador.valor == valor
            }
            else {
                return jugador
            };

        }
        function filtrarestado (jugador){
            if (estado){
                return jugador.estado == estado
            }
            else {
                return jugador
            };

        }
        function filtrarclub (jugador){
            if (club){
                return jugador.club == club
            }
            else {
                return jugador
            };

            
    
        }
        function encontrarjugadores (){
            const resultado2 = jugadores.find (encontrarnombre).find (encontrarposicion).find (encontrarvalor).find (encontrarestado).find (encontrarclub)
                if (resultado2.length > 0){
                    mostrarjugadores (resultado2)
                }
                else{
                    console.log ('no se ha encontrado el jugador');
                }
            }
        
            function encontrarnombre (jugador){
                if (nombre){
                    return jugador.nombre == nombre
                }
                else {
                    return jugador
                };
    
            }
            function encontrarposicion (jugador){
                if (posicion){
                    return jugador.posicion == posicion
                }
                else {
                    return jugador
                };
    
            }
            function encontrarvalor (jugador){
                if (valor){
                    return jugador.valor == valor
                }
                else {
                    return jugador
                };
    
            }
            function encontrarestado (jugador){
                if (estado){
                    return jugador.estado == estado
                }
                else {
                    return jugador
                };
    
            }
            function encontrarclub (jugador){
                if (club){
                    return jugador.club == club
                }
                else {
                    return jugador
                };
    
            }