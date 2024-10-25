import { loadCart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

export default async function loadData() {
  await Promise.all([loadProductsFetch(), loadCart()]);
}
