export const cart = JSON.parse(localStorage.getItem("amazon-cart")) || [];

export function addToCart(productId) {
  let productInCart;
  const quantity = +document.querySelector(`.js-quantity-selector-${productId}`)
    .value;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      productInCart = true;
      cartItem.quantity += quantity;
    }
  });
  if (!productInCart) {
    cart.push({ productId, quantity });
  }
  saveCart();
}

export function removeFromCart(productId) {
  for (let index = 0; index < cart.length; index++) {
    if (productId == cart[index].productId) {
      cart.splice(index, 1);
      saveCart();
      return;
    }
  }
}

export function calculateCartQuantity() {
  let total = 0;
  cart.forEach((cartItem) => (total += cartItem.quantity));
  return total;
}

function saveCart() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart));
}
