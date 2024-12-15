<template>
  <v-container>
    <v-row v-if="product" class="py-5">
      <!-- Left Column: Image -->
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-img
          :src="product.image"
          height="500px"
          width="100%"
          class="rounded-lg shadow-md"
          contain
        ></v-img>
      </v-col>

      <!-- Right Column: Product Details -->
      <v-col cols="12" md="6">
        <v-card class="elevation-2">
          <v-card-title class="text-h5 font-weight-bold">{{
            product.name
          }}</v-card-title>
          <v-card-subtitle class="text-h6 font-weight-bold mb-2"
            >${{ product.price }}</v-card-subtitle
          >
          <v-card-text class="mb-4">{{ product.description }}</v-card-text>

          <v-divider></v-divider>

          <!-- Specifications Section -->
          <v-card-text>
            <v-row>
              <v-col
                v-for="(value, key) in product.specifications"
                :key="key"
                cols="6"
                sm="4"
              >
                <strong
                  >{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</strong
                >
                {{ value }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <!-- Actions Section -->
          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              @click="addToCart"
              class="text-capitalize"
              variant="tonal"
              color="primary"
              elevation="2"
            >
              Add to Cart
            </v-btn>

            <v-btn
              @click="toggleWishlist"
              class="text-capitalize"
              variant="outlined"
              color="pink"
              elevation="2"
            >
              <v-icon>{{
                isInWishlist ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
              {{ isInWishlist ? "Remove from Wishlist" : "Add to Wishlist" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import productData from "~/assets/data/product-detail.json";

const route = useRoute();
const productId = parseInt(route.params.id, 10);

// Fetch product data based on the productId
const product = productData.find((p) => p.id === productId);

// Add to Cart functionality
const sellStore = useSellStore();
const addToCart = () => {
  sellStore.addProductToCart(product);
};

// Wishlist functionality
const commonStore = useCommonStore();
commonStore.loadWishlistFromCookies();

const isInWishlist = computed(() =>
  commonStore.wishlistItems.some((item) => item.id === product.id)
);

const toggleWishlist = () => {
  if (isInWishlist.value) {
    commonStore.removeProductFromWishlist(product.id);
  } else {
    commonStore.addProductToWishlist(product);
  }
};
</script>

<style scoped>
.v-img {
  transition: transform 0.3s ease;
}

.v-img:hover {
  transform: scale(1.05);
}

.v-card {
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
