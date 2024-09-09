import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayementSummary } from "./checkout/paymentSummary.js";


loadPage();

async function loadPage() {
  await loadProductsFetch();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPayementSummary();
}