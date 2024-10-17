export const cart = JSON.parse(localStorage.getItem("amazon-cart")) || [
  { total: 0 },
];

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
  cart[0].total += quantity;
  saveCart();
}

export function removeFromCart(productId) {
  for (let index = 1; index < cart.length; index++) {
    if (productId == cart[index].productId) {
      cart[0].total -= cart[index].quantity;
      cart.splice(index, 1);
      break;
    }
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart));
}
