function GenerarNavBuscador() {
    const footNav = document.createElement('footer');
    footNav.className = 'footer-general';
    footNav.innerHTML = `
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-logo">
                <img src="../../logo.png" alt="Logo astro">
                <h4> ASTRO  <h4>
            </div>
            <div class="footer-links">
                <ul>
                    <li><a href="/index.html">Comprar</a></li>
                    <li><a href="src/products/allproducts.html">Productos</a></li>
                    <li><a href="/src/sale/ventas.html">Ventas</a></li>
                    <li><a href="/src/MetodosPagoEnvios/MetodoPagoEnvios.html">Forma de Pago y Envío</a></li>
                </ul>
            </div>
            <div class="footer-social">
                <ul>
                    <li><a href="https://www.facebook.com/profile.php?id=61560734540696" target="_blank"><i class="fab fa-facebook">  <span>Facebook</span> </i></a></li>
                    <li><a href="https://x.com/ASTROUNAJ" target="_blank"><i class="fa-brands fa-x-twitter">  <span>X</span> </i></a></li>
                    <li><a href="https://www.instagram.com/astrounaj/"  target="_blank"><i class="fab fa-instagram">  <span>Instagram</span> </i></a></li>
                    <li><a href="/src/Ubicacion/ubicacion.html"><i class="fa-solid fa-location-dot">  <span>Ubicación</span> </i></a></li>
                </ul>
            </div>
            </div>
            <div class="footer-disclaimer">
                <p>&copy; 2024 Astro. Todos los derechos reservados.</p>
            </div>
    </div>
    `;
    return footNav;
}
const contenedor = document.getElementById('footer-general');
const footerNavegacion = GenerarNavBuscador();
contenedor.appendChild(footerNavegacion);