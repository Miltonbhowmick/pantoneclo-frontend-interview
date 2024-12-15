import { defineStore } from "pinia";
import { useCookie } from "nuxt/app";

export const useSellStore = defineStore("sell", {
  state: () => ({
    cartItems: useCookie("cartItems").value || [],
  }),
  actions: {
    addProductToCart(product) {
      const existingProduct = this.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.saveCartToStorage();
    },
    removeProductFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.saveCartToStorage();
    },
    saveCartToStorage() {
      useCookie("cartItems").value = this.cartItems;
    },
  },
});
