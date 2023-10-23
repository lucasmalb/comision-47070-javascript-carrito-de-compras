$(document).ready(function () {
    const cards = $('#cards');
    const Items = $('#items');
    const footer = $('#footer');
    const templateCard = $('#template-card').contents();
    const templateCarrito = $('#template-carrito').contents();
    const templateFooter = $('#template-footer').contents();
    const fragment = $(document.createDocumentFragment());
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    localStorage.clear();

    $(document).on('click', e => {
        addCarrito(e);
    });

    $(document).ready(() => {
        fetchData();
        cargarCarritoDesdeLocalStorage();
    });

    const fetchData = () => {
        $.ajax({
            url: './api.json',
            dataType: 'json',
            success: function (data) {
                pintarCards(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
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
        Items.empty();
        carrito.forEach(producto => {
            const clone = templateCarrito.clone(true);
            clone.find('th').text(producto.id);
            clone.find('td').eq(0).text(producto.titulo);
            clone.find('td').eq(1).text(producto.cantidad);
            clone.find('.btn-info').data('id', producto.id);
            clone.find('.btn-secondary').data('id', producto.id);
            clone.find('span').text(producto.cantidad * parseFloat(producto.precio));

            const btnInfo = clone.find('.btn-info');
            btnInfo.on('click', () => {
                btnAccion(producto.id, 'incrementar');
            });

            const btnSecondary = clone.find('.btn-secondary');
            btnSecondary.on('click', () => {
                btnAccion(producto.id, 'decrementar');
            });

            fragment.append(clone);
        });
        Items.append(fragment);
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

    const btnAccion = (prodid, accion) => {
        const producto = carrito.find(item => item.id === prodid);

        if (accion === 'incrementar') {
            producto.cantidad++;
        }

        if (accion === 'decrementar') {
            producto.cantidad--;
            if (producto.cantidad === 0) {
                carrito = carrito.filter(item => item.id !== prodid);
            }
        }

        pintarCarrito();
        guardarCarritoEnLocalStorage();
    };

    pintarFooter();
});