import ApiProduct from "../../service/ProductApi.js";
import displayCartCounter from '../../sale/carrito.js';
import addcart from './buy.js';
import { cart } from "../renderProducts.js";
document.addEventListener('DOMContentLoaded', function() {
    const categoryElements = document.querySelectorAll('.ui-search-filter-container');
    categoryElements.forEach(function(li) {
        li.addEventListener('click', function() {
            categoryElements.forEach(cat => cat.classList.remove('selected')); 
            this.classList.add('selected');
            const category = this.getAttribute('data-category');
            const searchTerm = document.getElementById('search-input').value;
            localStorage.setItem('selectedCategory', category);
            obtenerProductosByCategory(category,searchTerm,obtenerOrdenSeleccionado());
        });
    });
    const sortElements = document.querySelectorAll('.ui-sort-filter-container');
    sortElements.forEach(function(li) {
        li.addEventListener('click', function() {
            sortElements.forEach(sort => sort.classList.remove('selected')); 
            this.classList.add('selected'); 
            const order = this.getAttribute('data-order');
            const category = localStorage.getItem('selectedCategory');
            const searchTerm = document.getElementById('search-input').value;
            if (category) {
                obtenerProductosByCategory(category, searchTerm, order);
            } else {
                obtenerProductos(null, searchTerm, order);
            }
        });
    });
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value;
        const category = localStorage.getItem('selectedCategory')
        const ordenN = obtenerOrdenSeleccionado();
        if (searchTerm ) {
             obtenerProductosByName(null, searchTerm, ordenN);
        } else if (searchTerm && category) {
             obtenerProductosByName(category, searchTerm, ordenN);
        }
    });
    document.addEventListener('click', function(event) {
        const isCategoryClick = event.target.closest('.ui-search-filter-container');
        const isSortClick = event.target.closest('.ui-sort-filter-container');
        if (!isCategoryClick && !isSortClick) {
            localStorage.removeItem('selectedCategory');
            categoryElements.forEach(cat => cat.classList.remove('selected'));
            sortElements.forEach(sort => sort.classList.remove('selected'));
        }
    });
});
async function obtenerProductos(category, searchTerm,order) {
    try {
        let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
        let productsPerPage = parseInt(localStorage.getItem('productsPerPage')) || 8;
        const limit = productsPerPage; 
        const offset = productsPerPage * (currentPage - 1);
        const products = await ApiProduct.Get(category, searchTerm, null,limit, offset);
        const sortedProducts = sortProducts(products, order);        
        renderProductsBy(sortedProducts);
            
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}
async function obtenerProductosByCategory(category,searchTerm,order){
    try{
    const products = await ApiProduct.Get(category, searchTerm, null,null, null);
    const sortedProducts = sortProducts(products, order);        
    renderProductsBy(sortedProducts);
        
} catch (error) {
    console.error('Error al obtener productos:', error);
}
}
async function  obtenerProductosByName(category,searchTerm,order){
try{
    const products = await ApiProduct.Get(category, searchTerm, null,null, null);
    const sortedProducts = sortProducts(products, order);        
    renderProductsBy(sortedProducts);
        
} catch (error) {
    console.error('Error al obtener productos:', error);
}
}
function renderProductsBy(products) {
    const container = document.getElementById('productos-list');
    container.innerHTML = '';
    products.forEach(product => {
        const productHTML = `
            <div class="producto" data-categoryname="${product.categoryName}">
                <a href="/src/products/product.html" class="product-link" data-product-id="${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </a>
                <hr id="line">
                <h3>${product.name}</h3>
                <p><strong>Precio:</strong> $ ${(product.price * 1.21).toFixed(3)}</p> 
                ${product.discount > 0 ? `<p><strong>Descuento:</strong> ${product.discount}%</p>` : ''}           
                ${product.discount !== 0 ? `<p><strong>Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price * 1.21) * product.discount / 100)).toFixed(3)}</p>` : ''}                    
                <button data-product-id="${product.id}" id="ver-mas-button" class="ver-mas"><a href="/src/products/product.html" class="ver-mas-a"><p class="ver-mas-button">VER MÁS</p></a></button>
                <button class="buy-button">
                    <p class="addtocart"><strong>AGREGAR AL CARRITO</strong></p>
                    <input type="number" class="vquantity-input" value="1" min="1">
                </button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
    addcart.Get(products, cart, displayCartCounter);
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productId);
        });
    });

    const productMore = document.querySelectorAll('.ver-mas');
    productMore.forEach(link => {
        link.addEventListener('click', function () {
            const productMoreId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productMoreId);                
        });
    });
}

function obtenerOrdenSeleccionado() {
    let  selectedOrder = null;
    const Order = document.querySelectorAll('.ui-sort-filter-container');
    Order.forEach(function(li) {
        if (li.classList.contains('selected')) {
            selectedOrder = li.getAttribute('data-order');
        }
    });
    return selectedOrder;
}

function sortProducts(products, order) {

    if (order === 'asc') {
        return products.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        return products.sort((a, b) => b.price - a.price);
    }

    return products;
}