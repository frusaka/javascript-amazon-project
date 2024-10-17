export const cart = [
  { total: 0 },
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(productId) {
  let productInCart;
  const quantity = +document.querySelector(`.js-quantity-selector-${productId}`)
    .value;
  cart.forEach((product) => {
    if (product.id == productId) {
      productInCart = true;
      product.quantity += quantity;
    }
  });
  if (!productInCart) {
    cart.push({ productId, quantity });
  }
  cart[0].total += quantity;
}

export function removeFromCart(productId) {
  for (let index = 1; index < cart.length; index++) {
    if (productId == cart[index].id) {
      cart.splice(index, 1);
      break;
    }
  }
}
