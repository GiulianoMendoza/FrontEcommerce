async function AddtoCart(products, cart, displayCartCounter) {
    const buyButtons = document.querySelectorAll('.producto .buy-button');

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const product = products[index];
            const quantityInput = button.querySelector('.vquantity-input');
            const quantity = parseInt(quantityInput.value);
            const indexInCart = cart.findIndex(prod => prod.id === product.id);

            if (indexInCart !== -1) {
                cart[indexInCart].quantity += quantity;
                displayCartCounter.Get();
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    discount: product.discount,
                    price: product.price,
                    img: product.imageUrl,
                    quantity: quantity
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartCounter.Get();
                showAlert('Producto agregado al carrito');
            }
        });
    });
}
function showAlert(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");    
    customAlertMessage.innerText = message;
    customAlert.style.display = "block";
    setTimeout(function() {
        customAlert.style.display = "none";
    }, 800);
}
document.getElementById("custom-alert-close").addEventListener("click", function() {
    document.getElementById("custom-alert").style.display = "none";
});
const addcart = {
    Get : AddtoCart
};
export default addcart;