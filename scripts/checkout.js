import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";



loadPage();

async function loadPage() {
  await loadProductsFetch();
  renderCheckoutHeader();
}