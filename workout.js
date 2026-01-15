document.addEventListener("DOMContentLoaded", () => {
    // Show sections (home, products, etc.)
    window.show = function(id) {
        const sections = document.querySelectorAll(".section");
        sections.forEach(section => section.style.display = "none");
        document.getElementById(id).style.display = "block";
    }

    // Handle products
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const priceText = card.querySelector(".product-price");
        const sizeButtons = card.querySelectorAll(".size-btn");
        const cartButton = card.querySelector(".cartbutton");

        let selectedSize = "";
        let selectedPrice = 0;


        // Size button click
        sizeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                sizeButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                selectedSize = btn.textContent.trim();
                selectedPrice = Number(btn.dataset.price);

                priceText.textContent = `₱${selectedPrice}`;
            });
        });



        // Add to cart button click
        cartButton.addEventListener("click", () => {
            if (!selectedSize) return alert("Please select a size first.");


            const productName = card.querySelector("h2").textContent.trim();


            // Check if same product & size exists
            let cart = localStorage.getItem("cart") || [];
        
            if(typeof cart === "string"){
                cart = JSON.parse(cart)
            }
            let existing = false
            if(cart != null){
                existing = cart.find(item => item.name === productName && item.size === selectedSize);

            }
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    size: selectedSize,
                    price: selectedPrice,
                    quantity: 1
                });
            }


            localStorage.setItem("cart", JSON.stringify(cart));


            // Animate button feedback
            cartButton.classList.add("clicked");
            setTimeout(() => cartButton.classList.remove("clicked"), 1000);


            // Redirect to cart
            window.location.href = "shopbag.html";
        });
    });


});












        // search bar
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchbar input");
    const searchIcon = document.querySelector(".searchbar i");

    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") performSearch();
    });

    searchIcon.addEventListener("click", performSearch);
});

function performSearch() {
    const query = document.querySelector(".searchbar input").value.trim().toLowerCase();
    if (!query) return;

    const terms = query.split(" ");
    const cards = document.querySelectorAll(".product-card");
    let found = false;

    cards.forEach(card => {
        const keywords = card.dataset.keywords?.toLowerCase() || "";
        const description = card.querySelector(".description");

        const matches = terms.every(term => keywords.includes(term));

        if (matches) {
            show("products");

            const headerOffset = document.querySelector(".topbar").offsetHeight + 20;
            const elementPosition = card.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: "smooth"
            });

            description.style.display = "block";
            description.style.opacity = "1";
            description.style.transform = "translateX(0)";

            found = true;
        }
    });

    if (!found) {
        alert("No matching products found.");
    }
}



