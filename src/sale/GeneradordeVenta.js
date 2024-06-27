import GetVentasApi from '../service/SaleApi.js';
async function CargarListaVentas(id, fechaDesde, fechaHasta, page = 1, itemsPerPage = 10) {
    const seccionContenedora = document.getElementById(id);
    let ventas = await GetVentasApi.Get(null, fechaDesde, fechaHasta);
    seccionContenedora.innerHTML = '';

    if (ventas.length === 0) {
        const mensajeNoEncontrado = document.createElement('li');
        mensajeNoEncontrado.textContent = 'No hay ventas para ese rango de fechas';
        return seccionContenedora.appendChild(mensajeNoEncontrado);
    } else {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headers = ['ID', 'Fecha', 'Cantidad', 'Total', 'Detalle'];
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);
        seccionContenedora.appendChild(table);
        //paginación
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedVentas = ventas.slice(start, end);

        for (const venta of paginatedVentas) {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = `#${venta.id}`;
            row.appendChild(idCell);        
            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(venta.date).toLocaleDateString();
            row.appendChild(dateCell);
            const quantityCell = document.createElement('td');
            quantityCell.textContent = venta.totalQuantity;
            row.appendChild(quantityCell);
            const totalCell = document.createElement('td');
            totalCell.textContent = `$${venta.totalPay.toFixed(3)}`;
            row.appendChild(totalCell);
            const actionCell = document.createElement('td');
            const viewButton = document.createElement('button');
            viewButton.textContent = 'Ver';
            viewButton.addEventListener('click', function () {
                mostrarDetalleVenta(venta.id);
            });
            actionCell.appendChild(viewButton);
            row.appendChild(actionCell);
            tbody.appendChild(row);
        }
        setupPagination(seccionContenedora, ventas.length, itemsPerPage, page, fechaDesde, fechaHasta);
    }
}
async function mostrarDetalleVenta(ventaId) {
    try {
        let venta = await GetVentasApi.Get(ventaId, null, null);
        const productosHTML = venta.products.map(producto => `
            <tr>
                <td>${producto.productId}</td>
                <td>${producto.quantity}</td>
                <td>$${producto.price.toFixed(3)}</td>
                <td>${producto.discount > 0 ? `${producto.discount}%` : '-'}</td>
                <td>$${((producto.price * venta.taxes) - producto.price).toFixed(3)}</td>
                <td>$${(((producto.price * venta.taxes) - ((producto.price* venta.taxes) * (producto.discount > 0 ? producto.discount / 100 : 0))) * producto.quantity).toFixed(3)}</td>
            </tr>
        `).join('');
        const subtotal = venta.products.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
        const totalDiscount = venta.products.reduce((acc, producto) => acc + (producto.price * producto.discount / 100) * producto.quantity, 0);
        const totalQuantity = venta.products.reduce((acc, producto) => acc + producto.quantity, 0);
        const totalConImpuestos = (subtotal - totalDiscount) * venta.taxes;

        const detalleHTML = `
                <div class="header-container">
                <div id="ventaEncabezado">
                    <img src="/logo.png" alt="Astro">
                    <h1>ASTRO</h1>
                    <p><em>IVA Responsable Inscripto</em></p>
                </div>
                <div id="ventaInfo" class="venta-Info">
                    <p>ID Venta: ${venta.id}</p>
                    <p>Fecha: ${new Date(venta.date).toLocaleString()}</p>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Descuento</th>
                        <th>Taxes(21%)</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosHTML}
                    <tr>
                        <td colspan="5"><strong>SUBTOTAL:</strong></td>
                        <td><strong>$${subtotal.toFixed(3)}</strong></td>
                    </tr>                    
                    <tr>                    
                        <td colspan="1"><strong>TOTAL:</strong></td>
                        <td ><strong>${totalQuantity}</strong></td>             
                        <td ><strong></strong></td>
                        <td><strong>${venta.totalDiscount > 0 ? `$${venta.totalDiscount.toFixed(3)}` : '-'}</strong></td>
                        <td ><strong></strong></td>
                        <td><strong>$${totalConImpuestos.toFixed(3)}</strong></td>
                    </tr>
                </tbody>
            </table>
        `;
        document.getElementById('ventaDetalle').innerHTML = detalleHTML;
        document.getElementById('ventaModal').style.display = "block";
    } catch (error) {
        console.error('Error al obtener el detalle de la venta:', error);
        document.getElementById('ventaDetalle').innerHTML = "<p>Hubo un error al obtener el detalle de la venta. Por favor, inténtalo de nuevo más tarde.</p>";
        document.getElementById('ventaModal').style.display = "block";
    }
}
function setupPagination(container, totalItems, itemsPerPage, currentPage, fechaDesde, fechaHasta) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationDiv = document.createElement('div');
    paginationDiv.className = "pagination";

    container.appendChild(paginationDiv);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', function () {
            CargarListaVentas(container.id, fechaDesde, fechaHasta, i, itemsPerPage);
        });
        paginationDiv.appendChild(pageButton);
    }
}

const listaVentas = {
    Get: CargarListaVentas
};

export default listaVentas;