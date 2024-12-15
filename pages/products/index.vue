<template>
  <v-container>
    <!-- Search products -->
    <v-text-field
      v-model="searchQuery"
      label="Search Products"
      clearable
    ></v-text-field>

    <!-- Category Filter -->
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Select Category"
          item-title="state"
          item-value="value"
          outlined
        />
      </v-col>

      <!-- Sorting Dropdown -->
      <v-col cols="12" md="4">
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          label="Sort By"
          item-title="label"
          item-value="value"
          outlined
        />
      </v-col>
    </v-row>

    <!-- Products Display -->
    <v-row v-if="filteredProducts && filteredProducts.length > 0">
      <v-col
        v-for="product in filteredProducts"
        :key="product.id + sortBy"
        cols="12"
        md="4"
      >
        <v-card>
          <v-img :src="product.image" height="250px" cover></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>${{ product.price }}</v-card-subtitle>
          <v-card-text
            ><p class="truncate-text">{{ product.description }}</p></v-card-text
          >
          <v-card-actions>
            <v-btn
              :to="`/products/${product.id}`"
              class="text-capitalize"
              variant="tonal"
              color="primary"
              >View Details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <h1 v-else>Loading........</h1>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import productData from "~/assets/data/products.json";

// State for search query, selected category, and sorting option
const searchQuery = ref("");
const selectedCategory = ref(null);
const sortBy = ref("name");

// Categories array
const categories = ref([
  { state: "All Categories", value: null },
  { state: "Electronics", value: "electronics" },
  { state: "Clothing", value: "clothing" },
]);

// Sorting options array
const sortOptions = ref([
  { label: "Sort by Name (A-Z)", value: "name" },
  { label: "Sort by Name (Z-A)", value: "-name" },
  { label: "Sort by Price (Low to High)", value: "price" },
  { label: "Sort by Price (High to Low)", value: "-price" },
]);

// Computed property to filter and sort products based on selected category, search query, and sort option
const filteredProducts = computed(() => {
  let filtered = productData;

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sort by selected option (name or price)
  if (sortBy.value === "price") {
    // Ascending price from low to high
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "-price") {
    // Descending price from high to low
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === "name") {
    // Ascending name from A to Z
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === "-name") {
    // Descending name from Z to A
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
});
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 30px;
  max-height: calc(1.5em * 3);
}
</style>
