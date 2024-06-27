function GenerarNavBuscador() {
    const barraNav = document.createElement('nav');
    barraNav.className = 'navegacion';
    barraNav.innerHTML = `
        <li class="left-links">
            <a href="/index.html" class="texto">
                <img src="/logo.png" alt="Astro" class="logo">
                <h2 class="tituloNav">ASTRO</h2>
            </a>
        </li>
        <ul class="menu">
            <li class="left-links menu-opciones"> 
                <a href="/src/products/allproducts.html">PRODUCTOS</a> </li>
            </li>
            <li class="left-links menu-opciones">                
                <a href="/src/sale/ventas.html"><i class="fa-brands fa-shopify"></i>VENTAS</a>                
            </li>            
        </ul>
        
    `;
    return barraNav;
}
const contenedor = document.getElementById('navPrincipal');
const barraNavegacion = GenerarNavBuscador();
contenedor.appendChild(barraNavegacion);