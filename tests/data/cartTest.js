import { addToCart, cart, loadCart, removeFromCart } from "../../data/cart.js";

const product1Id = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const product2Id = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

beforeEach(() => {
  spyOn(localStorage, "getItem").and.callFake(() => {
    return JSON.stringify([
      {
        productId: product1Id,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: product2Id,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ]);
  });
  spyOn(localStorage, "setItem");
  loadCart();
});

describe("test suite: addToCart", () => {
  beforeEach(() => {
    cart.splice(0);
    addToCart(product1Id, 1);
  });
  it("Adds new item", () => {
    expect(cart.length).toEqual(1);
  });
  it("Updates quantity of exisiting item", () => {
    addToCart(product1Id, 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
  });
  it("Saves changes", () => expect(localStorage.setItem).toHaveBeenCalled());
});

describe("test suite: removeFromCart", () => {
  it("Removes from cart", () => {
    removeFromCart(product1Id);
    expect(cart.length).toEqual(1);
  });

  it("Saves changes", () => {
    removeFromCart(product1Id);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
