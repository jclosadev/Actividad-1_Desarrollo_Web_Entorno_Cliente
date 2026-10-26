const API_URL = "https://jsonblob.com/api/jsonBlob/01a1791d-b527-75b0-9271-da3b9e484a2d";

let carrito;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        carrito = new Carrito(data.productos);
        mostrarProductos(data.productos);
    })
    .catch(error => {
        console.log("Error al conectar con la API:", error);
    });

function mostrarProductos(productos) {
    const tbody = document.getElementById("lista-productos");

    productos.forEach(prod => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${prod.titulo}</td>
      <td>${prod.precio} €</td>
      <td>
        <input type="number" min="0" value="0" data-sku="${prod.SKU}" class="input-cantidad">
      </td>
    `;

        tbody.appendChild(tr);
    });

    const inputs = document.querySelectorAll(".input-cantidad");
    inputs.forEach(input => {
        input.addEventListener("input", function (e) {
            const sku = e.target.dataset.sku;
            const cantidad = e.target.value;

            carrito.actualizarUnidades(sku, cantidad);
            actualizarTotalDOM();
        });
    });
}

function actualizarTotalDOM() {
    const infoCarrito = carrito.obtenerCarrito();
    document.getElementById("precio-total").innerText = infoCarrito.total;
    document.getElementById("moneda").innerText = infoCarrito.currency;
}