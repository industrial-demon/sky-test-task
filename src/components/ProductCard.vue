<!--
  Картка вибраного товару: перегляд і редагування залишку.
  Написана на Options API (старий компонент, ще не переведений на <script setup>).
-->
<template>
  <aside class="product-card">
    <div class="product-card__header">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <button class="product-card__close" title="Закрити" @click="$emit('close')">×</button>
    </div>

    <p class="product-card__stock">
      Поточний залишок: <strong>{{ localStock }}</strong>
    </p>

    <div class="product-card__edit">
      <input
        v-model.number="editValue"
        type="number"
        min="0"
        class="product-card__input"
      />
      <button class="product-card__save" @click="save">Зберегти</button>
    </div>
  </aside>
</template>

<script>
import { useProductsStore } from '../stores/products'

export default {
  name: 'ProductCard',

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  emits: ['close'],

  data() {
    return {
      localStock: this.product.stock,
      editValue: this.product.stock,
    }
  },

  setup() {
    const store = useProductsStore()
    return { store }
  },

  methods: {
    async save() {
      await this.store.updateStock(this.product.id, this.editValue)
      this.localStock = this.editValue
    },
  },
}
</script>

<style scoped>
.product-card {
  width: 280px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e2e5ea;
  border-radius: 8px;
}

.product-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.product-card__title {
  margin: 0 0 8px;
  font-size: 16px;
}

.product-card__close {
  border: none;
  background: none;
  font-size: 20px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
}

.product-card__edit {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.product-card__input {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #cbd5e5;
  border-radius: 6px;
}

.product-card__save {
  padding: 6px 14px;
  border: none;
  background: #3457d5;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
</style>
