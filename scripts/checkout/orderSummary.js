import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  cart,
  saveCart,
  removeFromCart,
  calculateCartQuantity,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import deliveryOptions from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";

export default function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let matchingProduct;
    for (let product of products) {
      if (product.id == cartItem.productId) {
        matchingProduct = product;
        break;
      }
    }
    cartSummaryHTML += `
      <div class="cart-item-container" data-product-id="${matchingProduct.id}">
        <div class="delivery-date js-delivery-date">
          ${deliverDay(cartItem.deliveryOptionId)}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          ${cartItemDetailsHTML(matchingProduct, cartItem.quantity)}
          ${deliveryOptionsHTML(cartItem)}
        </div>
      </div>
    `;
  });

  updateCartQuantity();

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".cart-item-container").forEach((container) => {
    const productId = container.dataset.productId;
    const deleteLinks = container.querySelectorAll(".js-delete-link");
    const updateLinks = container.querySelectorAll(".js-update-link");
    const saveLinks = container.querySelectorAll(".js-save-link");
    const deliveryOptions = container.querySelectorAll(".js-delivery-option");

    deleteLinks.forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        removeFromCart(productId);
        updateCartQuantity();
        container.remove();
        renderPaymentSummary();
      });
    });

    updateLinks.forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        container.classList.add("is-editing-quantity");
      });
    });

    saveLinks.forEach((saveLink) => {
      saveLink.addEventListener("click", () =>
        showUpdateQuantityMode(container)
      );
    });

    deliveryOptions.forEach((deliveryOption) => {
      deliveryOption.addEventListener("click", () => {
        for (const cartItem of cart) {
          if (cartItem.productId == productId) {
            const deliveryCheck = deliveryOption.querySelector("input");
            cartItem.deliveryOptionId = deliveryCheck.dataset.deliveryOptionId;
            saveCart();
            renderOrderSummary();
            renderPaymentSummary();
            return;
          }
        }
      });
    });

    container.querySelector("input").addEventListener("keydown", (event) => {
      if (event.key == "Enter") showUpdateQuantityMode(container);
    });
  });
}

function updateCartQuantity() {
  document.querySelector(
    ".js-checkout-items"
  ).innerHTML = `${calculateCartQuantity()} items`;
}

function cartItemDetailsHTML(cartProduct, quantity) {
  return `
    <div class="cart-item-details">
      <div class="product-name">${cartProduct.name}</div>
      <div class="product-price">
        $${formatCurrency(cartProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link">
          Update
        </span>
        <input type="number" class="quantity-input" value="${quantity}" min=0 max=1000>
        <span class="save-quantity-link link-primary js-save-link">
          Save
        </span>
        <span class="delete-quantity-link link-primary js-delete-link">
          Delete
        </span>
      </div>
    </div>
    `;
}

function deliveryOptionsHTML(cartItem) {
  const productId = cartItem.productId;
  let optionsHTML = "";
  deliveryOptions.forEach((option) => {
    optionsHTML += `
      <div class="delivery-option js-delivery-option">
        <input type="radio"
          ${cartItem.deliveryOptionId == option.id ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-1-${productId}"
          data-delivery-option-id="${option.id}"
          data-product-id="${productId}"
          >
        <div>
          <div class="delivery-option-date">
            ${deliverDay(option.deliveryDays)}
          </div>
          <div class="delivery-option-price">
            ${
              option.priceCents
                ? `$${formatCurrency(option.priceCents)} -`
                : "FREE"
            } Shipping
          </div>
        </div>
      </div>
      `;
  });
  return `
    <div class="delivery-options js-delivery-option-${productId}">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${optionsHTML}
    </div>
  `;
}

function showUpdateQuantityMode(cartItemContainer) {
  const productId = cartItemContainer.dataset.productId;
  const newQuantity = +cartItemContainer.querySelector("input").value;
  if (newQuantity < 0 || newQuantity > 1000) {
    alert("Quantity must be between 0 and 1000");
    return;
  }
  for (const cartItem of cart) {
    if (cartItem.productId == productId) {
      cartItem.quantity = newQuantity;
      break;
    }
  }
  cartItemContainer.querySelector(".quantity-label").innerHTML = newQuantity;
  cartItemContainer.classList.remove("is-editing-quantity");
  updateCartQuantity();
  saveCart();
}

function deliverDay(offset) {
  const now = dayjs();
  if (!(typeof offset == "number")) {
    for (const option of deliveryOptions) {
      if (option.id == offset) {
        offset = option.deliveryDays;
        break;
      }
    }
  }
  return now.add(offset, "days").format("dddd, MMMM D");
}
