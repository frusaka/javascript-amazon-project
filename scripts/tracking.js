import { deliveryDurationFactor, formatDate } from "../data/deliveryOptions.js";
import { getOrder, getOrderProduct } from "../data/ordersProducts.js";
import { getProduct } from "../data/products.js";
import loadData from "./utils/data.js";

async function trackOrder() {
  await loadData();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const order = getOrder(orderId);
  const matchingProduct = getProduct(productId);
  const orderProduct = getOrderProduct(orderId, productId);
  const timeFactor = Math.max(0.1, deliveryDurationFactor(
    order.orderTime,
    orderProduct.estimatedDeliveryTime
  ));
  document.querySelector(".js-order-tracking").innerHTML = `
    <div class="order-tracking js-order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date js-delivery-date">
        Arriving on ${formatDate(orderProduct.estimatedDeliveryTime)}
      </div>

      <div class="product-info js-product-name">
        ${matchingProduct.name}
      </div>

      <div class="product-info js-product-quantity">
        Quantity: ${orderProduct.quantity}
      </div>

      <img class="product-image js-product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label ${timeFactor < 0.5 ? "current-status" : ""}">
          Preparing
        </div>
        <div class="progress-label ${timeFactor<1 && timeFactor > 0.5 ? "current-status" : ""}"">
          Shipped
        </div>
        <div class="progress-label ${timeFactor === 1 ? "current-status" : ""}"">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${timeFactor * 100}%"></div>
      </div>
    </div>
  `;
}

trackOrder();
