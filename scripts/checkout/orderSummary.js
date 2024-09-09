import { cart, removeFromCart, updateProductQuantity } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { loadProductsFetch, products } from "../../data/products.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { renderPayementSummary } from "./paymentSummary.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export async function renderOrderSummary() {
  // Ensure products are loaded before proceeding
  await loadProductsFetch();
  
  let html = '';

  let matchedItem = {};

  cart.forEach((item) => {

    const deliveryOptionId = item.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Find the matching product for the item in the cart
    const product = products.find((product) => item.productId === product.id);
    if (product) {
      matchedItem = product;
      
      // Build the HTML string
      html += 
      `
      <div class="cart-item-container js-cart-item-container-${matchedItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
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
            ${deliveryOptionHTML(matchedItem, item)}
            </div>
          </div>
      </div>
      `;
    }
  });

  


  /**
   * Set up delivery option
   */
  function deliveryOptionHTML(matchedProduct, item) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = () => {
        if (deliveryOption.priceCents === 0) {
          return 'FREE';
        } else {
          return `$${formatCurrency(deliveryOption.priceCents)}`;
        }
      };

      const isChecked = deliveryOption.id === item.deliveryOption; // because we have 3 options.
      console.log(item.deliveryOption);

      html += `
      <div class="delivery-option js-delivery-option" 
        data-product-id="${matchedProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
      >
        <input type="radio"
          ${isChecked ? 'checked': ''} 
          class="delivery-option-input"
          name="delivery-option-${matchedProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString()} Shipping
          </div>
        </div>
      </div>
      `;
    });
    return html;
  }

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
      renderPayementSummary();
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
    renderPayementSummary();
   });
 });
}
