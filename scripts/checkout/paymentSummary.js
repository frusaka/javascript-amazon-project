import { cart, calculateCartQuantity } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/ordersProducts.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export default function renderPaymentSummary() {
  let cartSum = 0;
  let shipping = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    cartSum += matchingProduct.priceCents * cartItem.quantity;
    shipping += deliveryOptions[+cartItem.deliveryOptionId - 1].priceCents;
  });
  const tax = (cartSum + shipping) * 0.1;
  document.querySelector(".js-payment-summary").innerHTML = `
    <div class="payment-summary-title">Order Summary</div>
  
    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(cartSum)}</div>
    </div>
  
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shipping)}
      </div>
    </div>
  
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(cartSum + shipping)}
      </div>
    </div>
  
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(tax)}
      </div>
    </div>
  
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(cartSum + shipping + tax)}
      </div>
    </div>
    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      // const order = await response.json();
      addOrder(await response.json());
      window.location.href = "orders.html";
    });
}
