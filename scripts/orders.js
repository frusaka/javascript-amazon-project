import { calculateCartQuantity, loadCart } from "../data/cart.js";
import { orders } from "../data/ordersProducts.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utils/money.js";

async function renderOrders() {
  await Promise.all([loadProductsFetch(), loadCart()]);
  let ordersHTML = "";
  orders.forEach((order) => {
    let orderDetailsHTML = "";
    order.products.forEach((Orderproduct) => {
      console.log(Orderproduct);
      const matchingProduct = getProduct(Orderproduct.productId);
      orderDetailsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
        <div class="product-details">
          <div class="product-name"> ${matchingProduct.name}</div>
          <div class="product-delivery-date">
            Arriving on: August 15
          </div>
          <div class="product-quantity"> Quantity: ${Orderproduct.quantity} </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
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
              <div>August 12</div>
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
}
renderOrders();
document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity();

