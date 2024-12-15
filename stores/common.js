import { defineStore } from "pinia";
import { useCookie } from "nuxt/app";

export const useCommonStore = defineStore("common", {
  state: () => ({
    wishlistItems: [],
  }),
  actions: {
    addProductToWishlist(product) {
      if (!this.wishlistItems.some((item) => item.id === product.id)) {
        this.wishlistItems.push(product);
        this.saveWishlistToCookies();
      }
    },
    removeProductFromWishlist(id) {
      this.wishlistItems = this.wishlistItems.filter((item) => item.id !== id);
      this.saveWishlistToCookies();
    },
    loadWishlistFromCookies() {
      const wishlistCookie = useCookie("wishlist");
      const savedWishlist = wishlistCookie.value;

      if (savedWishlist) {
        // Check if `savedWishlist` is already an object
        if (typeof savedWishlist === "string") {
          try {
            this.wishlistItems = JSON.parse(savedWishlist);
          } catch (error) {
            console.error("Error parsing wishlist cookie:", error);
            this.wishlistItems = [];
          }
        } else if (Array.isArray(savedWishlist)) {
          this.wishlistItems = savedWishlist; // Directly assign if it's already parsed
        }
      }
    },
    saveWishlistToCookies() {
      const wishlistCookie = useCookie("wishlist");
      wishlistCookie.value = JSON.stringify(this.wishlistItems); // Always save as JSON string
    },
  },
  getters: {
    wishlistCount: (state) => state.wishlistItems.length,
  },
});
