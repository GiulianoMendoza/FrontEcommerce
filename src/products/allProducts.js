import ApiProduct from '../service/ProductApi.js';
async function Allproducts(){
    const allproduct = await ApiProduct.Get(null,null,null,null,null);
    const containerall = document.getElementById('allproductos-list');    
    containerall.innerHTML = '';
    allproduct.forEach(product => {
        const productallHTML = ` 
                <div class="producto" data-categoryname="${product.categoryName}">
                    <a href="/src/products/product.html"class="product-link" data-product-id="${product.id}"><img src="${product.imageUrl}" alt="${product.name}"></a>
                    <hr id="line">
                    <h3>${product.name}</h3>
                    <p><strong>Precio:</strong> $ ${(product.price * 1.21).toFixed(3)}</p> 
                    ${product.discount > 0 ? `<p><strong>Descuento:</strong> ${product.discount}%</p>` : '<p></p>'}           
                    ${product.discount !== 0 ? `<p><strong>Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price*1.21) * product.discount / 100)).toFixed(3)}</p>` : '<p></p>'}                    
                    <button data-product-id="${product.id}" id="ver-mas-button" class="ver-mas"><a href="/src/products/product.html" class="ver-mas-a"><p class="ver-mas-button">VER MÁS</p></a></button>       
                </div>
            `;
            containerall.innerHTML += productallHTML;
    });
    const allproductLinks = document.querySelectorAll('.product-link');    
    allproductLinks.forEach(link => {
        link.addEventListener('click', function () {
            const allproductId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', allproductId);
        });
    });
    const allproductMore = document.querySelectorAll('.ver-mas');
    allproductMore.forEach(link =>{
        link.addEventListener('click', function(){
            const allproductMoreId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', allproductMoreId);
            
        });
    });

}
export default Allproducts;
document.addEventListener('DOMContentLoaded', function () {
    Allproducts();
});