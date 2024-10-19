import { cart, calculateCartQuantity } from "../../data/cart.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";
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
    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
}
