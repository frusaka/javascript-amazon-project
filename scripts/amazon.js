import { calculateCartQuantity, addToCart, loadCart } from "../data/cart.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadPage();

async function loadPage() {
  await Promise.all([loadProductsFetch(), loadCart()]);
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>
  
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
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
  
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id=${product.id}>
          Add to Cart
        </button>
      </div>
    `;
  });
  updateCartQuantity();
  document.querySelector(".js-proudcts-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart-button").forEach((jsButton) => {
    let previousTimeOut = { value: null };
    const productId = jsButton.dataset.productId;
    const quantity = +document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;

    jsButton.addEventListener("click", () => {
      addToCart(productId, quantity);
      showAddedLabel(productId, previousTimeOut);
      updateCartQuantity();
    });
  });
}

function showAddedLabel(productId, previousTimeOut) {
  const inCartElement = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  clearTimeout(previousTimeOut.value);
  inCartElement.classList.add("js-added-to-cart");
  previousTimeOut.value = setTimeout(
    () => inCartElement.classList.remove("js-added-to-cart"),
    2000
  );
}

function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML =
    calculateCartQuantity();
}
