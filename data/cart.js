export let cart;

export async function loadCart() {
  cart = JSON.parse(localStorage.getItem("amazon-cart")) || [];
  // const response = await fetch("https://supersimplebackend.dev/cart/");
  // console.log(response);
}

export function addToCart(productId, quantity) {
  let productInCart;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      productInCart = true;
      cartItem.quantity += quantity;
    }
  });
  if (!productInCart) {
    cart.push({ productId, quantity, deliveryOptionId: "1" });
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

export function saveCart() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart));
}
