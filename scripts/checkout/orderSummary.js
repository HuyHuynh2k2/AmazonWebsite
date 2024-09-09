import { cart, removeFromCart, updateProductQuantity } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { loadProductsFetch, products } from "../../data/products.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export async function renderOrderSummary() {
  // Ensure products are loaded before proceeding
  await loadProductsFetch();
  
  let html = '';

  let matchedItem = {};

  cart.forEach((item) => {
    // Find the matching product for the item in the cart
    const product = products.find((product) => item.productId === product.id);
    if (product) {
      matchedItem = product;
      
      // Build the HTML string
      html += 
      `
      <div class="cart-item-container js-cart-item-container-${matchedItem.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchedItem.images}">
    
          <div class="cart-item-details">
            <div class="product-name">
              ${matchedItem.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchedItem.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchedItem.id}">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchedItem.id}>
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchedItem.id}" >
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchedItem.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchedItem.id}">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  });

  // Update the DOM after HTML is fully built
  document.querySelector('.js-order-summary').innerHTML = html;

  /**
   * This code update the updatedate element
   */
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });
   
  
 /*
  * This code will set up the delete link
  */
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderOrderSummary();
      renderCheckoutHeader();
      // need to render payement here.
    });
  });

 /*
  * This code is for save link
  */
 document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateProductQuantity(productId, newQuantity);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;

    renderOrderSummary();
    renderCheckoutHeader();
   });
 });
}
