import { loadCart } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";

loadPage();

async function loadPage() {
  await Promise.all([loadProductsFetch(), loadCart()]);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
