import { describe, it, expect } from 'vitest'
import { filterLowStockProductsByGroup } from '../src/views/LowStockProducts.vue'

describe('LowStockProducts filter', () => {
  const lowStockProducts = [
    { id: 1, name: 'Зошит', stock: 2, minStock: 5, groupId: 'stationery' },
    { id: 2, name: 'Кава', stock: 1, minStock: 3, groupId: 'food' },
    { id: 3, name: 'Ручка', stock: 4, minStock: 10, groupId: 'stationery' },
  ]

  it('повинен показувати всі товари з низьким залишком, якщо вибрано всі групи', () => {
    expect(filterLowStockProductsByGroup(lowStockProducts, 'ALL')).toEqual(lowStockProducts)
  })

  it('повинен фільтрувати товари з низьким залишком за вибраною групою', () => {
    expect(filterLowStockProductsByGroup(lowStockProducts, 'stationery')).toEqual([
      lowStockProducts[0],
      lowStockProducts[2],
    ])
  })
})
