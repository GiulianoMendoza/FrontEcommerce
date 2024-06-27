import ApiProduct from '../service/ProductApi.js';
import displayCartCounter from '../sale/carrito.js';
import addcart from './complementos/buy.js';
import pagination from './complementos/Filterpagination.js';
const cart = [];
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
let productsPerPage = parseInt(localStorage.getItem('productsPerPage')) || 8;
async function renderProducts(currentPage) {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(...savedCart);
    const limit = productsPerPage; 
    const offset = productsPerPage * (currentPage  - 1);
    const totalProducts = await getTotalProducts(); 
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await ApiProduct.Get(null,null,null,limit,offset);
    const container = document.getElementById('productos-list');    
    container.innerHTML = '';
    products.forEach(product => {
        const productHTML = `
                <div class="producto" data-categoryname="${product.categoryName}">
                    <a href="/src/products/product.html"class="product-link" data-product-id="${product.id}"><img src="${product.imageUrl}" alt="${product.name}"></a>
                    <hr id="line">
                    <h3>${product.name}</h3>
                    <p><strong>Precio:</strong> $ ${(product.price * 1.21).toFixed(3)}</p> 
                    ${product.discount > 0 ? `<p><strong>Descuento:</strong> ${product.discount}%</p>` : '<p></p>'}           
                    ${product.discount !== 0 ? `<p><strong>Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price*1.21) * product.discount / 100)).toFixed(3)}</p>` : '<p></p>'}                    
                    <button data-product-id="${product.id}" id="ver-mas-button" class="ver-mas"><a href="/src/products/product.html" class="ver-mas-a"><p class="ver-mas-button">VER MÁS</p></a></button>
                    <button class="buy-button">
                    <p class="addtocart" id="fontaddtocart"><strong >AGREGAR AL CARRITO</strong></p>
                    <input type="number" class="vquantity-input" value="1" min="1">
                    </button>                   
                </div>
            `;
        container.innerHTML += productHTML;
    });
    addcart.Get(products, cart,displayCartCounter);
    const productLinks = document.querySelectorAll('.product-link');
    
    productLinks.forEach(link => {
        link.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productId);
        });
    });
    const productMore = document.querySelectorAll('.ver-mas');
    productMore.forEach(link =>{
        link.addEventListener('click', function(){
            const productMoreId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productMoreId);
            
        });
    });

    pagination.Get(totalPages, currentPage, renderProducts);
}
async function getTotalProducts() {
    const productstotal = await ApiProduct.Get(null,null,null,null)
    return productstotal.length;
}
export { cart };
export default renderProducts;
document.addEventListener('DOMContentLoaded', function () {
    renderProducts(currentPage);
    displayCartCounter.Get();
});