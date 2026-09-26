<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useProductsStore } from "../stores/products";
import { useGroupsStore } from "../stores/groups";
import ProductDialog from "../components/ProductDialog.vue";

const productStore = useProductsStore();
const groupStore = useGroupsStore();

const selectedGroup = ref("ALL");

const filterdLowStockProducts = computed(() => {
  if (selectedGroup.value === "ALL") {
    return productStore.lowStockProducts;
  }

  return productStore.lowStockProducts.filter((p) => p.groupId === selectedGroup.value);
});

async function updateStock({productId, stock}) {
  console.log(productId, stock);
  // productStore.updateStock(id, stock);
}

onMounted(() => {
  productStore.fetchProducts();
  groupStore.fetchGroups();
});
</script>

<template>
  <header>
    <h2>Товари з низьким залишком</h2>

    <div class="filters">
      Filters:

      <div class="filters__controls">
        <select class="group-select" v-model="selectedGroup">
          <option value="ALL">Всі</option>
          <option v-for="group in groupStore.items" v-bind:value="group.id" :key="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
    </div>
  </header>


  <ul class="product-list">



  <li class="product-list__item" v-for="product in filterdLowStockProducts" :key="product.id">
    {{ product.name  }} -
    {{ product.stock }}
    <ProductDialog v-bind:product="product" v-on:on-submit="updateStock">
      <template v-slot:trigger="{ toggleDialog }">
        <button v-on:click="toggleDialog">Додати +</button>
      </template>
    </ProductDialog>
  </li>
  </ul>
</template>

<style>

.product-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
  padding: 0;
  list-style: none;
}


.product-list__item {
  display: flex;
  justify-content: space-between;
}

.group-select {
  height: 24px;
}
.filters {
  margin: 15px 0px;
}
.filters__controls {
  display: flex;
  gap: 12px;
}
</style>
