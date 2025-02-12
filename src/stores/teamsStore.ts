import { defineStore } from 'pinia'
import { getTeams } from '@/services/teamsService'
import { type Team } from '@/types/Team'

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    teams: [] as Team[],
    loading: false,
    error: null,
  }),
  actions: {
    // Priamy zápis funkcií namiesto actions
    async loadTeams() {
      this.loading = true
      this.error = null

      try {
        this.teams = await getTeams()
        this.teams = [...this.teams] // TypeScript: skopíruj dáta do nového poľa
      } catch (error: any) {
        console.error('Chyba pri načítavaní tímov:', error)
        this.error = error.message || 'Nastala chyba pri načítavaní tímov.'
      } finally {
        this.loading = false
      }
    },
  },
})
