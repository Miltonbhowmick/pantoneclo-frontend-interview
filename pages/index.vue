<template>
  <v-container>
    <!-- Hero Banner Section -->
    <v-row class="hero-banner mb-5 mb-md-12">
      <v-col cols="12" class="text-center">
        <v-img src="https://via.placeholder.com/1500x600" class="hero-image">
          <div class="hero-content w-100 w-md-50">
            <h1 class="text-h6 text-md-h3">Pantoneclo</h1>
            <p class="text-caption text-md-body-1">
              Explore our latest collections and new arrivals.
            </p>
            <v-btn color="primary" large href="/products" class="mt-4"
              >Shop Now</v-btn
            >
          </div>
        </v-img>
      </v-col>
    </v-row>

    <!-- New Arrivals Section -->
    <v-row>
      <v-col cols="12">
        <h2>New Arrivals</h2>
      </v-col>
      <v-col v-for="product in newArrivals" :key="product.id" cols="12" md="4">
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

    <!-- Trending Section -->
    <v-row>
      <v-col cols="12">
        <h2>Trending</h2>
      </v-col>
      <v-col v-for="product in trending" :key="product.id" cols="12" md="4">
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

    <!-- Men Section -->
    <v-row>
      <v-col cols="12">
        <h2>Men's Collection</h2>
      </v-col>
      <v-col
        v-for="product in menCollection"
        :key="product.id"
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
  </v-container>
</template>

<script setup>
import productData from "~/assets/data/products.json";

// Filter the products based on tags
const newArrivals = productData.filter((product) =>
  product.tags.includes("New Arrivals")
);
const trending = productData.filter((product) =>
  product.tags.includes("Trending")
);
const menCollection = productData.filter((product) =>
  product.tags.includes("Men")
);
</script>

<style scoped>
.hero-image {
  position: relative;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(1.5em * 3);
}
</style>
