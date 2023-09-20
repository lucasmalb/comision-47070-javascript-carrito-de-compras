const jugadores = [
    {
        nombre: 'Lionel Messi',
        posicision: 'Delantero',
        valor: 400000,
        estado: 'intranferible',
        club: 'inter de miami',
    },
    {
        nombre: 'Diego Maradona',
        posicion: 'delantero', 
        valor: 380000,
        estado: 'no cedible',
        club: 'Napoli',
    },
    {
        nombre: 'Ronaldo Nazario',
        posicision: 'Delantero',
        valor: 180000,
        estado : 'libre',
        club: 'sin club',
    },
    {
        nombre: 'Iker Casillas',
        posicision: 'arquero',
        valor: 120000,
        estado : 'cedible',
        club: 'Porto',
    },
    {
        nombre: 'Eder Militao',
        posicision: 'defensa',
        valor: 350000,
        estado : 'intranferible',
        club: 'Real Madrid',
    },
    {
        nombre: 'Arturo Vidal',
        posicision: 'mediocampista',
        valor: 70000,
        estado : 'en prestamo',
        club: 'Flamengo',
    },
    {
        nombre: 'Mateo Kovacik',
        posicision: 'medicampista',
        valor: 110000,
        estado : 'en venta',
        club: 'chelsea',
    },
    {
        nombre: "N'golo Kante",
        posicision: 'Mediocampista',
        valor: 160000,
        estado : 'libre',
        club: 'sin club',
    },
    {
        nombre: 'Killiam Mbappe',
        posicision: 'Delantero',
        valor: 450000,
        estado : '6 meses termina su contrato',
        club: 'Paris Saint Germain',
    },
    {
        nombre: 'Cristiano Ronaldo',
        posicision: 'Delantero',
        valor: 220000,
        estado : 'cedible',
        club: ' Al-Nassr ',
    },
    
]

function mostrarjugadores (jugadores){
    jugadores.forEach(jugador => console.log (jugador.nombre + ' - ' + jugador.posicion + ' - ' + jugador.valor + '-' + jugador.nombre + ' - ' + jugador.estado + ' - ' + jugador.club + ' - '))   
    };

mostrarjugadores (jugadores);