
let nombre = prompt ('indique el nombre del jugador')
let posicion = prompt('indique la posicion del jugador')
let valor = prompt('indique el monto que piensa gastar')
let estado = prompt('indique en que estado de tranderencia quiere buscar aljugador' + '1 cedible' + '\n'
    + 'libre' + '\n'
    + 'en 6 meses termina el contrato' + '\n'
    + 'en venta' + '\n'
    + 'en prestamo' + '\n'
    + 'intransferible' + '\n'
)
let club = prompt('indique en que club esta el jugador')



function mostrarjugadores(jugadores) {
    jugadores.forEach(jugador => console.log(jugador.nombre + ' - ' + jugador.posicion + ' - ' + jugador.valor + '-' + jugador.nombre + ' - ' + jugador.estado + ' - ' + jugador.club + ' - '))
};
function filtrarJugadoresPorAtributo(jugadores, atributo, valor) {
    return jugadores.filter(jugador => {
        if (valor) {
            return jugador[atributo].toString().toLowerCase()
        }
        else {
            return true;
        }
    })
};

function filtrarjugadores(jugadores) {
    const resultado = filtrarJugadoresPorAtributo(jugadores, 'nombre', nombre)
    .filter(jugador => filtrarJugadoresPorAtributo([jugador], 'posicion', posicion).length > 0)
    .filter(jugador => filtrarJugadoresPorAtributo([jugador], 'valor', valor).length > 0)
    .filter(jugador => filtrarJugadoresPorAtributo([jugador], 'estado', estado).length > 0)
    .filter(jugador => filtrarJugadoresPorAtributo([jugador], 'club', club).length > 0);

    console.log('resultado del filtro:');
    if (resultado.length > 0) {
        mostrarjugadores(resultado);
    }
    else {
        console.error('no se ha encontrado el jugador');
    }

};
filtrarjugadores(jugadores)

function encontrarjugadores(jugadores){    
const encontrar = jugadores.find(i => i.nombre.toLowerCase() === nombre.toLowerCase())
    if (encontrar) {
        console.log(
            encontrar.nombre + '-'
            + encontrar.posicion + '-'
            + encontrar.valor + '-'
            + encontrar.estado + '-'
            + encontrar.club + '-'
        )
    } else {

        console.log("no se ha encontrado el jugador");

    }

};
encontrarjugadores(jugadores)