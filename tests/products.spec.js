import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '../src/stores/products'
import client from '../src/api/client'

vi.mock('../src/api/client', () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}))

describe('useProductsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('повинен завантажувати товари через fetchProducts', async () => {
    client.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Зошит', stock: 10 }] })

    const store = useProductsStore()
    await store.fetchProducts()

    expect(store.items).toHaveLength(1)
    expect(store.loading).toBe(false)
  })

  it('повинен оновлювати кількість товару навіть якщо items оновились паралельно', async () => {
    client.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Зошит', stock: 10 }] })
    const store = useProductsStore()
    await store.fetchProducts()

    let resolvePatch
    client.patch.mockReturnValueOnce(new Promise((r) => { resolvePatch = r }))
    const updatePromise = store.updateStock(1, 5)

    client.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Зошит', stock: 10 }] })
    await store.fetchProducts()

    resolvePatch({ data: { id: 1, stock: 5 } })
    await updatePromise

    expect(store.items.find((item) => item.id === 1).stock).toBe(5)
  })
})
