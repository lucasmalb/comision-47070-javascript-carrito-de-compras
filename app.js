const cards = document.getElementById('cards');
const Items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateFooter = document.getElementById('template-footer').content;
const fragment = document.createDocumentFragment();
let carrito = [] || JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener('click', e => {
    addCarrito(e);
});

    $(document).ready(() => {
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
            const clone = templateCard.clone(true);
            clone.find('h5').text(producto.titulo);
            clone.find('p').text(producto.precio);
            clone.find('img').attr('src', producto.foto);
            clone.find('.btn-dark').data('id', producto.id);

            fragment.append(clone);
        });
        cards.append(fragment);
    };

    const addCarrito = e => {
        if ($(e.target).hasClass('btn-dark')) {
            setCarrito($(e.target).closest('div.card'));
        }
        e.stopPropagation();
        guardarCarritoEnLocalStorage();
    };

    const setCarrito = objeto => {
        const producto = {
            id: objeto.find('.btn-dark').data('id'),
            titulo: objeto.find('h5').text(),
            precio: objeto.find('p').text(),
            cantidad: 1
        };

        const carritoProducto = carrito.find(item => item.id === producto.id);

        if (carritoProducto) {
            carritoProducto.cantidad++;
        } else {
            carrito.push(producto);
        }

        pintarCarrito();
    };

    const guardarCarritoEnLocalStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const cargarCarritoDesdeLocalStorage = () => {
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            pintarCarrito();
        }
    };

const pintarCarrito = () => {
    Items.innerHTML = '';
    carrito.forEach(producto => {
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
        footer.empty();
        const totalQuantity = carrito.reduce((acc, { cantidad }) => acc + cantidad, 0);
        const totalPrice = carrito.reduce((acc, { cantidad, precio }) => acc + cantidad * parseFloat(precio), 0);

        const row = $('<tr></tr>');
        const colCantidad = $('<td></td>');
        const botonVaciar = $('<button>Vaciar Carrito</button>');
        botonVaciar.attr('id', 'vaciar-carrito');
        botonVaciar.addClass('btn btn-danger');
        colCantidad.text('Total productos');
        colCantidad.attr('colspan', '2');

        const colBoton = $('<td></td>');
        colBoton.text(totalQuantity);

        const colTotal = $('<td></td>');
        colTotal.attr('colspan', '2');
        colTotal.addClass('text-end');
        colTotal.html(`Total: $ <span>${totalPrice.toFixed(2)}</span>`);

        row.append(colCantidad);
        row.append(colBoton);
        row.append(colTotal);
        row.append(botonVaciar);
        footer.append(row);

        const vaciarCarritoBtn = $('#vaciar-carrito');
        vaciarCarritoBtn.on('click', () => {
            carrito = [];
            pintarCarrito();
            guardarCarritoEnLocalStorage();
        });
    };

cards.addEventListener('click', e => {
    addCarrito(e);
});

Items.addEventListener('click', e => {
    btnAccion(e);
});

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        // Acción de aumentar
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] =producto ;
        pintarCarrito();
    }

    if (e.target.classList.contains('btn-secondary')) {
        // Acción de disminuir
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        } else {
            carrito[e.target.dataset.id] = producto ;
        }
        pintarCarrito();
    }
};




