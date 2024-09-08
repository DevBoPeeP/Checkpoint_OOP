document.addEventListener("DOMContentLoaded", () => {
  // Define the Product class
  class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }

  // Define the ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }

    // Calculate total price for this item
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }

  // Define the ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }

    // Method to add an item to the cart
    addItem(product, quantity) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
    }

    // Method to remove an item from the cart
    removeItem(productId) {
      this.items = this.items.filter((item) => item.product.id !== productId);
    }

    // Method to get the total price of the cart
    getTotal() {
      return this.items.reduce(
        (total, item) => total + item.getTotalPrice(),
        0
      );
    }

    // Method to update the DOM with the current cart items
    updateDOM() {
      const cartContainer = document.querySelector(".shopping-cart-container");
      cartContainer.innerHTML = ""; // Clear existing items

      // Create and add cart items dynamically
      this.items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card-whole");

        card.innerHTML = `
            <div class="card" style="width:18rem">
              <div class="product-info">
                <span class="product-name">${item.product.name}</span>
                <span class="unit-price">$${item.product.price.toFixed(
                  2
                )}</span>
              </div>

              <div class="quantity-controls">
                <i class="fa fa-minus-circle"></i>
                <span class="quantity">${item.quantity}</span>
                <i class="fa fa-plus-circle"></i>
              </div>
              <i class="fa fa-trash-alt"></i>
            </div>
          `;
        cartContainer.appendChild(card);
      });

      // Create and add total price container dynamically
      const totalPriceDiv = document.createElement("div");
      totalPriceDiv.classList.add("total-price");

      totalPriceDiv.innerHTML = `
          <span>Total price: </span>
          <span class="total">${this.getTotal().toFixed(2)} $</span>
        `;

      cartContainer.appendChild(totalPriceDiv); // Append total price div to cart container
    }
  }

  // Initialize the shopping cart
  const cart = new ShoppingCart();

  // Function to update total price in the DOM
  const updateTotalPrice = () => {
    cart.updateDOM();
  };

  // Event listeners for incrementing and decrementing quantity, removing items, and toggling favorite state
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-alt")) {
      const card = event.target.closest(".card-whole");
      const productName = card.querySelector(".product-name").textContent;
      const product = cart.items.find(
        (item) => item.product.name === productName
      ).product;

      cart.removeItem(product.id); // Remove the product
      updateTotalPrice();
    }
  });

  // Example products
  const basket = new Product(1, "basket", 1.99);
  const bag = new Product(2, "bag", 3.59);
  const socks = new Product(3, "socks", 1.29);
  const shoes = new Product(4, "shoes", 10.0);

  // Add initial items to the cart
  cart.addItem(basket, 1);
  cart.addItem(bag, 2);
  cart.addItem(socks, 5);
  cart.addItem(shoes, 2);

  // Update the DOM initially
  updateTotalPrice();
});
