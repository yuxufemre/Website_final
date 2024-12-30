// Load Cart Data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Render Cart Items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="remove-button" data-id="${item.id}">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Update Cart Quantities
cartItemsContainer.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const newQuantity = parseInt(event.target.value);

        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
        }
    }
});

// Remove Items from Cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
    }
});

// Checkout Button
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Checkout işlemi buraya eklenebilir
});

// Initial Render
renderCartItems();
