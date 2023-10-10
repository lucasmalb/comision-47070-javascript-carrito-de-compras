
const cards = document.getElementById('cards');
const Items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateFooter = document.getElementById('template-footer').content;
const fragment = document.createDocumentFragment();
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let carrito = {};

document.addEventListener('click', e => {
    addCarrito(e);
});


/*vaciarCarritoBtn.addEventListener('click', e => {
    addCarrito = (e);
    pintarCarrito();
    guardarCarritoEnLocalStorage(); 
});*/

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    cargarCarritoDesdeLocalStorage();
});


const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
};


const pintarCards = data => {
    data.forEach(producto => {
        const clone = templateCard.cloneNode(true); // Clona la plantilla
        clone.querySelector('h5').textContent = producto.titulo; // Establece el título
        clone.querySelector('p').textContent = producto.precio; // Establece el precio
        clone.querySelector('img').setAttribute('src', producto.foto); // Establece la imagen
        clone.querySelector('.btn-dark').dataset.id = producto.id; // Establece el ID del botón

        fragment.appendChild(clone); // Agrega el clon al fragmento
    });
    cards.appendChild(fragment); // Agrega el fragmento al contenedor de tarjetas
}
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    };

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = { ...producto };
    pintarCarrito();
};
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarCarritoDesdeLocalStorage = () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito')); // Recupera el carrito desde el localStorage
        pintarCarrito();
    }
};

const pintarCarrito = () => {
    Items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-secondary').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * parseFloat(producto.precio);

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });
    Items.appendChild(fragment);
    pintarFooter();
};

const pintarFooter = () => {
    footer.innerHTML = '';
    const totalQuantity = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const totalPrice = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * parseFloat(precio), 0);

    const row = document.createElement('tr');
    const colCantidad = document.createElement('td');
    colCantidad.textContent = 'Total productos';
    colCantidad.setAttribute('colspan', '2');

    const colBoton = document.createElement('td');
    colBoton.textContent = totalQuantity;

    const colTotal = document.createElement('td');
    colTotal.setAttribute('colspan', '2');
    colTotal.classList.add('text-end');
    colTotal.innerHTML = `Total: $ <span>${totalPrice.toFixed(2)}</span>`;

    row.appendChild(colCantidad);
    row.appendChild(colBoton);
    row.appendChild(colTotal);
    footer.appendChild(row);
};

cards.addEventListener('click', (e) => {
    addCarrito(e);
});

Items.addEventListener('click', (e) => {
    btnAccion(e);
});

const btnAccion = (e) => {
    if (e.target.classList.contains('btn-info')) {
        // Acción de aumentar
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto };
        pintarCarrito();
    }

    if (e.target.classList.contains('btn-secondary')) {
        // Acción de disminuir
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        } else {
            carrito[e.target.dataset.id] = { ...producto };
        }
        pintarCarrito();
    }
};    
