import { defineStore } from "pinia";
import client from "../api/client";

export const useProductsStore = defineStore("products", {
  state: () => ({
    items: [],
    loading: false,
    error: null,

    isUpdating: false,
    updateStatus: null,
  }),

  getters: {
    lowStockProducts() {
      return this.items.filter((p) => p.stock < p.minStock);
    },
  },

  actions: {
    clearUpdateStatus() {
      if (this.updateStatus) {
        this.updateStatus = null;
      }
    },
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await client.get("/products");
        this.items = response.data || [];
      } catch (e) {
        this.error = e.message;
        console.warn(e);
      } finally {
        this.loading = false;
      }
    },

    async updateStock(productId, stock) {
      const currentItems = this.items;
      this.isUpdating = true;
      try {
        await client.patch(`/products/${productId}`, { stock });
        const product = currentItems.find((item) => item.id === productId);
        if (product) {
          product.stock = stock;
        }
        this.updateStatus = "success";
      } catch (e) {
        this.updateStatus = "error";
      } finally {
        this.isUpdating = false;
      }
    },
  },
});
