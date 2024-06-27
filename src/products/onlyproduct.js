import ApiProduct from '../service/ProductApi.js';
async function onlyProduct(){
        const productId = sessionStorage.getItem('selectedProductId');
        const product = await ApiProduct.Get(null,null,productId);
        const titleElement = document.querySelector('title');
        titleElement.textContent = product.name;
        const container = document.getElementById('product-container');
        const productHTML = `     
            <a class="return-link" href="/index.html">&lt; VOLVER</a>             
            <div class="product">
                <a href="#"><img src="${product.imageUrl}" alt="${product.name}"></a>
            </div>                   
            <div class="product-info">
                <div class="product-tittle"><h1>${product.name}</h1></div>
                <div class="product-category"><p><strong>Categoría:</strong> ${product.category.name}</p></div>
                <div class="product-price"><p><strong>Precio:</strong> $ ${(product.price * 1.21).toFixed(3)}</p></div>
                ${product.discount > 0 ? `<div class="product-discount"><p><strong>Descuento:</strong> ${product.discount}%</p></div>` : ''}
                ${product.discount !== 0 ? `<div class="product-Pricediscount"><p><strong>Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price*1.21) * product.discount / 100)).toFixed(3)}</p></div>` : ''}
                <div class="product-description"><p><strong>Descripcion:</strong> ${product.description}</p></div>
            </div>
        `;
        container.innerHTML = productHTML;
}


export default onlyProduct;
document.addEventListener('DOMContentLoaded', function () {
    onlyProduct();
});