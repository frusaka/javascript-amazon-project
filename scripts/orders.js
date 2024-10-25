import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { formatDate } from "../data/deliveryOptions.js";
import { orders } from "../data/ordersProducts.js";
import { getProduct } from "../data/products.js";
import loadData from "./utils/data.js";
import formatCurrency from "./utils/money.js";

async function renderOrders() {
  await loadData();
  let ordersHTML = "";
  orders.forEach((order) => {
    let orderDetailsHTML = "";
    order.products.forEach((Orderproduct) => {
      const matchingProduct = getProduct(Orderproduct.productId);
      orderDetailsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
        <div class="product-details">
          <div class="product-name"> ${matchingProduct.name}</div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(Orderproduct.estimatedDeliveryTime, 0)}
          </div>
          <div class="product-quantity"> Quantity: ${
            Orderproduct.quantity
          } </div>
          <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${matchingProduct.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${
        Orderproduct.productId
      }">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime, false)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">${orderDetailsHTML}</div>
      </div>
    `;
  });
  document.querySelector(".js-orders").innerHTML = ordersHTML;
  document.querySelectorAll(".js-buy-again").forEach((jsButton) => {
    jsButton.addEventListener("click", () => {
      addToCart(jsButton.dataset.productId, 1);
      location.href = "checkout.html";
    });
  });
}
renderOrders();
document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity();
