class Carrito {
    constructor(productos) {
        this.productos = productos;
        this.unidades = {};

        for (let p of productos) {
            this.unidades[p.SKU] = 0;
        }
    }

    actualizarUnidades(sku, unidades) {
        this.unidades[sku] = Number(unidades);
    }

    obtenerInformacionProducto(sku) {
        let producto = this.productos.find(p => p.SKU === sku);
        return {
            sku: producto ? producto.SKU : sku,
            quantity: this.unidades[sku] || 0
        };
    }

    obtenerCarrito() {
        let total = 0;
        let lista = [];

        for (let p of this.productos) {
            let cantidad = this.unidades[p.SKU] || 0;
            total += cantidad * parseFloat(p.precio);

            lista.push({
                sku: p.SKU,
                titulo: p.titulo,
                precio: p.precio,
                cantidad: cantidad
            });
        }

        return {
            total: total.toFixed(2),
            currency: "€",
            products: lista
        };
    }
}