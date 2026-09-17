// ===============================
// SHOPPING CART
// ===============================

let cart = JSON.parse(localStorage.getItem("lunaCart")) || [];

function saveCart() {
    localStorage.setItem("lunaCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.getElementById("cart-count");

    if (countElement) {
        let count = cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        countElement.textContent = count;
    }
}

function addToCart(name, price) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to your cart!");
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <h2>Your cart is empty</h2>
                <p>Discover our beautiful dresses.</p>
                <br>
                <a href="shop.html" class="btn">SHOP NOW</a>
            </div>
        `;

        updateCartTotal();
        return;
    }

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price.toLocaleString("en-IN")}</p>
            </div>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

            <strong>
                ₹${(item.price * item.quantity).toLocaleString("en-IN")}
            </strong>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateCartTotal();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    displayCart();
}


// ===============================
// CALCULATE TOTAL
// ===============================

function updateCartTotal() {

    const totalElement = document.getElementById("cart-total");
    const finalTotal = document.getElementById("final-total");

    let total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    if (totalElement) {
        totalElement.textContent =
            total.toLocaleString("en-IN");
    }

    if (finalTotal) {
        finalTotal.textContent =
            total.toLocaleString("en-IN");
    }
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Thank you for shopping with Luna Dress Shop!\n\n" +
        "This is a demo checkout page."
    );
}


// ===============================
// PRODUCT FILTER
// ===============================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".shop-product");

    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}


// ===============================
// CONTACT FORM
// ===============================

function sendMessage(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const message =
        document.getElementById("form-message");

    message.textContent =
        "Thank you, " + name +
        "! Your message has been received.";

    event.target.reset();
}


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    const menu =
        document.querySelector(".nav-links");

    menu.classList.toggle("show");
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();
    displayCart();

});