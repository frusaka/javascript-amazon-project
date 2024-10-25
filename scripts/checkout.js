import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import loadData from "./utils/data.js";

loadPage();

async function loadPage() {
  await loadData();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
