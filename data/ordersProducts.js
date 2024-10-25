export const orders = JSON.parse(localStorage.getItem("amazon-orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveorders();
}

function saveorders() {
  localStorage.setItem("amazon-orders", JSON.stringify(orders));
}
