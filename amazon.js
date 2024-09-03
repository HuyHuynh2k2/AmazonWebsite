// first we going to generate data 
import { products } from "./data/products.js";




function generateItem() {
  let html = '';

  products.forEach((product) => {
    const productId = product.id;
    const productImage = product.image;
    const productName = product.name;
    const productPrice = product.priceCents;
    const productStars = product.rating.stars;
    const productStarCount = product.rating.count;

    html += 
    `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${productImage}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${productName}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productStars * 10}.png">
        <div class="product-rating-count link-primary">
          ${productStarCount}
        </div>
      </div>

      <div class="product-price">
        $${productPrice / 100}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
    `;
  });
  document.querySelector('.js-products-display').innerHTML = html;
}

generateItem();