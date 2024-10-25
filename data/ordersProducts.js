export const orders = JSON.parse(localStorage.getItem("amazon-orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveorders();
}

export function getOrder(orderId) {
  for (const order of orders) {
    if (order.id == orderId) return order;
  }
}

export function getOrderProduct(orderId, productId) {
  for (const product of getOrder(orderId).products) {
    if (product.productId === productId) return product;
  }
}

function saveorders() {
  localStorage.setItem("amazon-orders", JSON.stringify(orders));
}
