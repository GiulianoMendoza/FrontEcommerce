import { cart } from "../products/renderProducts.js";
import ApiSale from "../service/SaleApi.js";
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");
const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);
    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
        <div class="product">
            <img class="product-img" src="${product.img}">
            <div class="product-info">
                <h4>${product.name}"</h4>
            </div>
            <div class="quantity">
                <span class="quantity-btn-decrese">-</span>
                <span class="quantity-input">${product.quantity}</span>
                <span class="quantity-btn-increse">+</span>
            </div>
            <div class="price">${(((product.price * 1.21)* product.quantity) * (1 - (product.discount > 0 ? product.discount / 100 : 0))).toFixed(3) }$</div>
            <div class="delete-product"><i class="fa-solid fa-xmark"></i></div>
        </div>
            `;
            modalContainer.append(modalBody);
            const decrese = modalBody.querySelector(".quantity-btn-decrese");
            decrese.addEventListener("click", () => {
                if (product.quantity !== 1) {
                    product.quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCart();      
                }
                displayCartCounter();
            })
            const increse = modalBody.querySelector(".quantity-btn-increse");
            increse.addEventListener("click", () => {
                product.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart();
                displayCartCounter();
            });
            
            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });
        const total = cart.reduce((acc, product) => {
            const totalPrice = (product.price * 1.21) * product.quantity;
            const discountedPrice = totalPrice * (1 - (product.discount > 0 ? product.discount / 100 : 0));
            return acc + discountedPrice;
        }, 0).toFixed(3);
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer"
        modalFooter.innerHTML = `
        <div class="total-price"> Total: $ ${total} </div>
        <button class="btn-primary" id="checkout-btn-sale"> pagar </button>
        <button class="btn-primary" id="checkout-btn-clear"> Vaciar Carrito </button>      
        `;
        modalContainer.append(modalFooter);

    }else if (!cart.length && !localStorage.getItem('saleCompleted')) {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "El Carrito está vacío";
        modalContainer.append(modalText);
    }
};

cartBtn.addEventListener("click", displayCart);
const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((produ) => produ.id === id)
    cart.splice(foundId, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    displayCartCounter();
};
const clearCart = () => {
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('saleCompleted');
    displayCart();
    displayCartCounter();
};
const clearlocalstorageCart = () => {
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('saleCompleted');
};
const displayCartCounter = () => {
    const cartLegth = cart.reduce((acc, products) => acc + products.quantity, 0);
    if (cartLegth > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLegth;
    }
    else {        
        cartCounter.style.display = "none"
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const cartBtn = document.getElementById("cart-btn");
    const cartmodalsale = document.getElementById("modal-container");
    function addCheckoutEventListener() {        
        const checkoutBtn = document.getElementById("checkout-btn-sale");
        const clearCartBtn = document.getElementById("checkout-btn-clear");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", generateSale);           
            clearCartBtn.addEventListener("click", clearCart);
        }
    }
    function generateSale() {
        let products = [];
        const subtotal = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        const total = (subtotal * 1.21).toFixed(4);
        for (let i = 0; i < cart.length; i++) {
            products.push({
                productId: cart[i].id,
                quantity: +cart[i].quantity                           
            });
        }
        ApiSale.Post(products, total)
            .then(response => {                
                showAlert("Venta realizada exitosamente");
                localStorage.setItem('saleCompleted', true);
                clearlocalstorageCart();
                cart.length = 0;
                displayCart();
                displayCartCounter();
            })
            .catch(error => {
                showAlert("Error al realizar la venta:", error);
            });
    }

    function displayCart() {
        addCheckoutEventListener();
    }
    cartBtn.addEventListener("click", displayCart);
    cartmodalsale.addEventListener("click", displayCart);
});
function showAlert(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    
    customAlertMessage.innerText = message;
    customAlert.style.display = "block";
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  }
  
  document.getElementById("custom-alert-close").addEventListener("click", function() {
    document.getElementById("custom-alert").style.display = "none";
  });
const cartcounter = {
    Get: displayCartCounter
};
export default cartcounter;