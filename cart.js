let cart = [];

export function addToCart(product, quantity = 1) {
  const cartItem = {
    product,
    quantity,
  };

  cart.push(cartItem);
}

export function clearCart() {
  cart = [];
}

export function getCartItems() {
  return cart;
}

export function calculateTotalAmount() {
  let total = 0;

  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return total;
}