document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const cartTotalText = document.querySelector("#cart-total");
    const emptyMessage = document.querySelector("#cart-empty");
    const checkoutBtn = document.querySelector("#checkout-btn");

    function renderCart() {
        let cart = localStorage.getItem("cart") || [];
        
        if(typeof cart === "string"){
            cart = JSON.parse(cart)
        }
        
        cartTableBody.innerHTML = "";

        if (cart.length === 0) {
            emptyMessage.style.display = "block";
            cartTotalText.textContent = "";
            return;
        } else {
            emptyMessage.style.display = "none";
        }

        let totalAmount = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");

            // Product name
            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            // Size
            const sizeCell = document.createElement("td");
            sizeCell.textContent = item.size;
            row.appendChild(sizeCell);

            // Quantity
            const qtyCell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.value = item.quantity;
            input.addEventListener("change", () => {
                const newQty = Math.max(1, parseInt(input.value));
                item.quantity = newQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
            qtyCell.appendChild(input);
            row.appendChild(qtyCell);

            // Price
            const priceCell = document.createElement("td");
            priceCell.textContent = `₱${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Total
            const totalCell = document.createElement("td");
            const itemTotal = item.price * item.quantity;
            totalCell.textContent = `₱${itemTotal.toFixed(2)}`;
            totalAmount += itemTotal;
            row.appendChild(totalCell);

            // Remove
            const removeCell = document.createElement("td");
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.cursor = "pointer";
            removeBtn.addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
            removeCell.appendChild(removeBtn);
            row.appendChild(removeCell);

            cartTableBody.appendChild(row);
        });

        cartTotalText.textContent = `Total: ₱${totalAmount.toFixed(2)}`;
    }

    renderCart();






    
checkoutBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // 1. Retrieve User Email and Address
    const username = localStorage.getItem("rememberedUsername"); 
    let userAddress = localStorage.getItem("userAddress"); // Assuming you saved this at registration

    // 2. If address is missing, ask for it (Fallback)
    if (!userAddress) {
        userAddress = prompt("Please enter your delivery address:");
        if (!userAddress) {
            alert("Address is required to proceed.");
            return;
        }
    }

    if (!username) {
        alert("Please log in to complete your order.");
        return;
    }

    // 3. Format cart items
    const itemsList = cart.map(item => `• ${item.name} - $${item.price}`).join("\n");
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    // 4. Prepare parameters for EmailJS
    // const templateParams = {
    //     to_email: userEmail,
    //     shipping_address: userAddress, // Added this field
    //     message: itemsList,
    //     total_price: `$${totalPrice.toFixed(2)}`
    // };

    // 5. Send Email
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    //     .then(() => {
    //         alert("Order confirmed! A confirmation email has been sent to " + userEmail);
    //         localStorage.removeItem("cart");
    //         renderCart();
    //     }, (error) => {
    //         alert("Error sending email. Please try again.");
    //         console.error("EmailJS Error:", error);
    //     });

    alert("Order confirmed! A confirmation email has been sent to " + username);

    // 6. go back
    localStorage.setItem("cart", [])
    window.location.href = "../final.html"
});
});
