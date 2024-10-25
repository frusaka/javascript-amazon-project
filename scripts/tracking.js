import { formatDate } from "../data/deliveryOptions.js";
import { getOrderProduct } from "../data/ordersProducts.js";
import { getProduct } from "../data/products.js";
import loadData from "./utils/data.js";

async function trackOrder() {
  await loadData();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const matchingProduct = getProduct(productId);
  const orderProduct = getOrderProduct(orderId, productId);
  document.querySelector(".js-product-name").innerHTML = matchingProduct.name;
  document.querySelector(".js-product-quantity").innerHTML =
    "Quantity: " + orderProduct.quantity;
  document.querySelector(".js-delivery-date").innerHTML =
    "Arriving on " + formatDate(orderProduct.estimatedDeliveryTime);
  document.querySelector(".js-product-image").src = matchingProduct.image;
}

trackOrder();
