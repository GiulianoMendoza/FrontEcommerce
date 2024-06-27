import listaVentas from '../sale/GeneradordeVenta.js';
const fechaDesdeInput = document.getElementById("fechaDesdeInput");
const fechaHastaInput = document.getElementById("fechaHastaInput");
const buscarVentasBtn = document.getElementById("buscarVentas");
const listaVentasContenedor = document.getElementById("listaVentas"); 

buscarVentasBtn.addEventListener("click", async function() {
    const fechaDesde = fechaDesdeInput.value;
    const fechaHasta = fechaHastaInput.value;

    try {
        await listaVentas.Get('listaVentas', fechaDesde, fechaHasta); 
    } catch (error) {
        console.error('Error al cargar la lista de ventas:', error);
        listaVentasContenedor.innerHTML = "<p>Hubo un error al cargar la lista de ventas. Por favor, inténtalo de nuevo más tarde.</p>";
    }
    if (fechaDesde && fechaHasta) {
        document.getElementById("fechaDesde").textContent = fechaDesde;
        document.getElementById("fechaHasta").textContent = fechaHasta;
        document.getElementById("mostrarFechas").style.display = "block";
    }
});

const closeModal = document.querySelector(".close");

closeModal.addEventListener("click", function() {
    document.getElementById("ventaModal").style.display = "none";
});