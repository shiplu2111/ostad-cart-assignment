import { products } from './product.js';
import { addToCart, clearCart, getCartItems, calculateTotalAmount } from './cart.js';

// Function to create product item HTML
function createProductItem(product) {
  const item = document.createElement("div");
  item.classList.add("p-4", "border", "border-gray-300", "rounded","text-center");

  const name = document.createElement("h3");
  name.textContent = product.name;
  name.classList.add("text-lg", "font-bold", "mb-2");
  item.appendChild(name);

  const price = document.createElement("p");
  price.textContent = `$${product.price.toFixed(2)}`;
  price.classList.add("mb-2");
  item.appendChild(price);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    renderCartItems();
  });
  item.appendChild(addToCartBtn);

  return item;
}

// Function to create cart item HTML
function createCartItem(item) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("border", "border-gray-300", "rounded", "p-4");

  const name = document.createElement("h3");
  name.textContent = item.product.name;
  name.classList.add("text-lg", "font-bold", "mb-2");
  cartItem.appendChild(name);

  const quantity = document.createElement("p");
  quantity.textContent = `Quantity: ${item.quantity}`;
  quantity.classList.add("mb-2");
  cartItem.appendChild(quantity);

  const price = document.createElement("p");
  price.textContent = `Price: $${(item.product.price * item.quantity).toFixed(2)}`;
  cartItem.appendChild(price);

  return cartItem;
}

// Function to render product list
function renderProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productItem = createProductItem(product);
    productList.appendChild(productItem);
  });
}

// Function to render cart items
function renderCartItems() {
  const shoppingCart = document.getElementById("shopping-cart");
  shoppingCart.innerHTML = "";

  const cartItems = getCartItems();
  cartItems.forEach((item) => {
    const cartItem = createCartItem(item);
    shoppingCart.appendChild(cartItem);
  });

  const totalAmount = calculateTotalAmount();

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty.";
    shoppingCart.appendChild(emptyMessage);
  } else {
    const total = document.createElement("p");
    total.textContent = `Total: $${totalAmount.toFixed(2)}`;
    shoppingCart.appendChild(total);
  }
}

// Event listener for clearing the cart
const clearCartBtn = document.getElementById("clear-cart-btn");
clearCartBtn.addEventListener("click", () => {
  clearCart();
  renderCartItems();
});

// Initial rendering
renderProductList();
renderCartItems();