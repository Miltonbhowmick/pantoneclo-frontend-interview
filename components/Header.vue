<template>
  <v-container>
    <v-app-bar app color="primary" elevate-on-scroll dark class="px-16">
      <!-- Logo and Navigation -->
      <v-row class="align-center">
        <v-col cols="auto">
          <nuxt-link to="/" class="text-h6 font-weight-bold text-white"
            >PantonecloEcom</nuxt-link
          >
        </v-col>
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn text class="text-white text-capitalize" to="/products"
            >Stores</v-btn
          >
        </v-col>
      </v-row>

      <!-- Spacer for center alignment -->
      <v-spacer></v-spacer>

      <!-- Cart and Wishlist Icons -->
      <v-row class="align-center justify-end px-1">
        <v-switch
          v-model="darkMode"
          prepend-icon="mdi-white-balance-sunny"
          append-icon="mdi-weather-night"
          density="compact"
          hide-details
          class="px-0"
          @change="toggleTheme"
        >
        </v-switch>
        <v-btn to="/wishlist">
          <v-badge :content="wishlistItemCount" color="pink" overlap>
            <v-icon color="white">mdi-heart</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon @click="openCart">
          <v-badge :content="cartItemCount" color="red" overlap>
            <v-icon color="white">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </v-row>
    </v-app-bar>

    <!-- Cart Sidebar -->
    <client-only>
      <v-navigation-drawer
        v-if="cartSidebar"
        v-model="cartSidebar"
        location="right"
      >
        <v-list>
          <v-list-item v-for="item in cartItems" :key="item.id">
            <div class="py-3 d-flex justify-space-between">
              <div>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ item.quantity }} x ${{ item.price }}</v-list-item-subtitle
                >
              </div>

              <v-btn icon @click="removeProduct(item.id)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="py-4">
            <v-list-item-title>Total: ${{ totalPrice }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </client-only>
  </v-container>
</template>

<script setup>
import { useTheme } from "vuetify";
const sellStore = useSellStore();
const commonStore = useCommonStore();
const cartSidebar = ref(false);
const theme = useTheme();
var darkMode = ref(false);

const cartItems = computed(() => sellStore.cartItems);
commonStore.loadWishlistFromCookies();

// To count wishlist
const wishlistItemCount = computed(() => commonStore.wishlistCount);
const totalPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);
const cartItemCount = computed(() => cartItems.value.length);

const openCart = () => {
  cartSidebar.value = !cartSidebar.value;
};

const removeProduct = (id) => {
  sellStore.removeProductFromCart(id);
};

const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "darkTheme" : "lightTheme";
  localStorage.setItem("manzaar_darktheme", darkMode.value);
};

const initTheme = () => {
  const darkTheme = JSON.parse(localStorage.getItem("manzaar_darktheme"));
  if (darkTheme === true) {
    darkMode.value = true;
    toggleTheme();
  } else if (darkTheme === false) {
    darkMode.value = false;
    toggleTheme();
  }
};

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.v-btn {
  margin: 0 5px;
}
.v-navigation-drawer {
  max-width: 400px;
}
</style>
