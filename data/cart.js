export const cart = [{ total: 0 }];

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