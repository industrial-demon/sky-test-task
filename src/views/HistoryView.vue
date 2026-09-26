<template>
  <div class="history">
    <p v-if="!items.length">Історія порожня.</p>
    <ul class="history__list">
      <li v-for="entry in items" :key="entry.id" class="history__item">
        <span class="history__date">{{ formatDate(entry.date) }}</span>
        <span class="history__product">{{ entry.product?.name ?? `Товар #${entry.productId}` }}</span>
        <span class="history__type">{{ typeLabels[entry.type] ?? entry.type }}</span>
        <span
          class="history__amount"
          :class="entry.amount < 0 ? 'history__amount--minus' : 'history__amount--plus'"
        >
          {{ formatAmount(entry.product.stock - entry.product.minStock) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import client from '../api/client'

const typeLabels = {
  sale: 'Продаж',
}

const items = ref([])

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatAmount(amount) {
  return amount > 0 ? `+${amount}` : String(amount)
}

onMounted(async () => {
  const response = await client.get('/history', {
    params: { _expand: 'product', _sort: 'date', _order: 'desc' },
  })
  items.value = response.data || []
})
</script>

<style scoped>
.history__list {
  list-style: none;
  padding: 0;
}

.history__item {
  display: grid;
  grid-template-columns: 150px 1fr 120px 60px;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #e2e5ea;
  border-radius: 6px;
  margin-bottom: 8px;
}

.history__date,
.history__type {
  color: #6b7280;
  font-size: 14px;
}

.history__amount {
  text-align: right;
  font-weight: 600;
}

.history__amount--minus {
  color: #b91c1c;
}

.history__amount--plus {
  color: #15803d;
}

@media (max-width: 600px) {
  .history__item {
    grid-template-columns: 1fr auto;
  }
}
</style>
