export let products;

export async function loadProductsFetch() {
  const response = await fetch("https://supersimplebackend.dev/products");
  products = await response.json();
}

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response);
    callback();
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

export function getProduct(productId) {
  for (const product of products) {
    if (product.id == productId) return product;
  }
}

loadProductsFetch();
