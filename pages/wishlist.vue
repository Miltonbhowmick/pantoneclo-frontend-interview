<template>
  <v-container>
    <v-row justify="center" class="py-8">
      <v-col cols="12">
        <v-card outlined>
          <v-card-title class="text-h5 font-weight-bold">
            Wishlist ({{ wishlistCount }} Items)
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-row v-if="wishlistItems.length">
              <v-col
                v-for="item in wishlistItems"
                :key="item.id"
                cols="12"
                md="4"
                lg="3"
              >
                <v-card>
                  <v-img
                    :src="item.image"
                    :alt="item.name"
                    aspect-ratio="1.5"
                  ></v-img>
                  <v-card-title class="text-h6">{{ item.name }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1">
                    ${{ item.price }}
                  </v-card-subtitle>
                  <v-card-actions class="flex-column">
                    <v-btn
                      color="primary"
                      variant="tonal"
                      block
                      @click="addToCart(item)"
                    >
                      Add to Cart
                    </v-btn>
                    <v-btn
                      color="error"
                      variant="tonal"
                      block
                      @click="removeFromWishlist(item.id)"
                    >
                      Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-else class="text-center">
              <v-col>
                <v-icon size="64">mdi-heart-off-outline</v-icon>
                <p>Your wishlist is empty.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const commonStore = useCommonStore();
const sellStore = useSellStore();

const wishlistItems = computed(() => commonStore.wishlistItems);
const wishlistCount = computed(() => commonStore.wishlistCount);

const addToCart = (item) => {
  sellStore.addProductToCart(item);
};

const removeFromWishlist = (id) => {
  commonStore.removeProductFromWishlist(id);
};

// Load wishlist from cookies on page load
onMounted(() => {
  commonStore.loadWishlistFromCookies();
});
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
