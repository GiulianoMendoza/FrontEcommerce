const toggle = document.getElementById('toggle');
const label_toggle = document.getElementById('label_toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');
const filterStylesheet = document.getElementById('filter-stylesheet');
const OnlyProductStylesheet = document.getElementById('themeOnly-stylesheet');
const detailStylesheet = document.getElementById('detail-stylesheet');
const saleRenderStylesheet = document.getElementById('salerender-stylesheet');
const ubicationStylesheet = document.getElementById('ubication-stylesheet');
const allproductsStylesheet = document.getElementById('themeAll-stylesheet');
const payStylesheet = document.getElementById('pay-stylesheet');
function getThemeFromLocalStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}
function setThemeToLocalStorage(key, theme) {
    localStorage.setItem(key, theme);
}
function applyTheme(theme) {
    const lightTheme = theme === 'light';

    if (themeStylesheet) {
        themeStylesheet.setAttribute('href', lightTheme ? '/src/indexCSS/indexclaro.css' : '/src/indexCSS/index.css');
    }
    if (filterStylesheet) {
        filterStylesheet.setAttribute('href', lightTheme ? '/src/products/productCSS/filterstyleclaro.css' : '/src/products/productCSS/filterstyle.css');
    }
    if (OnlyProductStylesheet) {
        OnlyProductStylesheet.setAttribute('href', lightTheme ? '/src/indexCSS/indexclaroOnlyProduct.css' : '/src/indexCSS/index.css');
    }
    if (detailStylesheet) {
        detailStylesheet.setAttribute('href', lightTheme ? '/src/sale/saleCSS/detalleVentaClaro.css' : '/src/sale/saleCSS/detalleVenta.css');
    }
    if (saleRenderStylesheet) {
        saleRenderStylesheet.setAttribute('href', lightTheme ? '/src/sale/saleCSS/ventasRenderClaro.css' : '/src/sale/saleCSS/ventasRender.css');
    }
    if (ubicationStylesheet) {
        ubicationStylesheet.setAttribute('href', lightTheme ? '/src/Ubicacion/ubicacionClaro.css' : '/src/Ubicacion/ubicacion.css'); 
    }
    if (allproductsStylesheet) {
        allproductsStylesheet.setAttribute('href', lightTheme ? '/src/products/productCSS/allproductsclaro.css' : '/src/products/productCSS/allproducts.css'); 
    }
    if (payStylesheet) {
        payStylesheet.setAttribute('href', lightTheme ? '/src/MetodosPagoEnvios/MetodopagoClaro.css' : '/src/MetodosPagoEnvios/Metodopago.css'); 
    }
    label_toggle.innerHTML = lightTheme ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    label_toggle.style.color = lightTheme ? 'yellow' : '#9a8be5';
}
toggle.addEventListener('change', (event) => {
    const checked = event.target.checked;
    const theme = checked ? 'light' : 'dark';
    applyTheme(theme);
    setThemeToLocalStorage('theme', theme);
    setThemeToLocalStorage('productTheme', theme);
    setThemeToLocalStorage('detailTheme', theme);
});

document.addEventListener('DOMContentLoaded', () => {
    const theme = getThemeFromLocalStorage('theme', 'dark');
    applyTheme(theme);
    toggle.checked = theme === 'light';
});