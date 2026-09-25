import { defineStore } from 'pinia'
import client from '../api/client'

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    items: [],
  }),

  actions: {
    async fetchGroups() {
      const response = await client.get('/groups')
      this.items = response.data || []
    },
  },
})
