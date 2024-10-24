import { loadCart } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => loadCart(resolve)),
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
