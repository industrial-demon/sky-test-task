<template>
  <div class="products">
    <div class="products__toolbar">
      <button class="products__refresh" @click="refresh">Оновити</button>
      <span v-if="store.loading" class="products__status">Завантаження…</span>
    </div>

    <div class="products__layout">
      <table class="products__table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Кількість</th>
            <th>Мін. залишок</th>
            <th>Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in store.items"
            :key="product.id"
            class="products__row"
            :class="{ 'products__row--selected': product.id === selectedId }"
            @click="selectedId = product.id"
          >
            <td>{{ product.name }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.minStock }}</td>
            <td>{{ product.price }} ₴</td>
          </tr>
        </tbody>
      </table>

      <ProductCard
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedId = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const store = useProductsStore()
const selectedId = ref(null)

const selectedProduct = computed(() =>
  store.items.find((item) => item.id === selectedId.value)
)

function refresh() {
  store.fetchProducts()
}

onMounted(() => {
  store.fetchProducts()
})
</script>

<style scoped>
.products__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.products__refresh {
  padding: 8px 16px;
  border: 1px solid #3457d5;
  background: #fff;
  color: #3457d5;
  border-radius: 6px;
  cursor: pointer;
}

.products__status {
  color: #6b7280;
  font-size: 14px;
}

.products__layout {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 24px;
}

.products__table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.products__table th,
.products__table td {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid #e2e5ea;
}

.products__row {
  cursor: pointer;
}

.products__row:hover {
  background: #f7f9fc;
}

.products__row--selected,
.products__row--selected:hover {
  background: #eaf0ff;
}

@media (max-width: 720px) {
  .products__layout {
    grid-template-columns: 1fr;
  }
}
</style>
