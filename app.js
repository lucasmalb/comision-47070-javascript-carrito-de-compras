const cards = document.getElementById('cards')
const Items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment()
let carrito = {}
document.addEventListener('click', e => {
    addCarrito(e)
})

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.array.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAtribute("src", producto.foto)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id


        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}
const addCarrito = e => {
    console.log(e.target)
    console.log(e.target.classlist.contains('btn-dark'))
    if (e.target.classlist.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}
const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[pruducto.id] = { ...producto }

}
const pintarcarrito = () => {
    Items.innerHTML = ''
    objet.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textcontent = producto.id
        templateCarrito.querySelector('td')[0].textcontent = producto.titulo
        templateCarrito.querySelector('td')[1].textcontent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textcontent = producto.cantdad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    Items.appendChild(fragment)
    pintarfooter()
}
const pintarfooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope ="row" colspan="5"> Carrito vacio - comience a comprar</th>
        `
    }
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad + precio, 0)
    templateFooter
}