import { defineStore } from 'pinia'
import { getTeams, getTeamById, updateTeam as updateTeamService } from '@/services/teamsService'
import { type Team } from '@/types/Team'

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    teams: [] as Team[],
    loading: false,
    error: null as string | null,
    lastFetched: 0, // Timestamp pre kontrolu cache
    selectedTeamId: null as string | null, // ID vybraného tímu
  }),

  getters: {
    selectedTeam: (state) => state.teams.find((team) => team.id === state.selectedTeamId) || null,
  },

  actions: {
    async loadTeams(forceRefresh = false): Promise<Team[]> {
      // Pridali sme : Promise<Team[]>
      console.log('loadteams in store')
      if (!forceRefresh && this.teams.length > 0 && Date.now() - this.lastFetched < 1000 * 60) {
        console.log('Používam cacheované dáta')
        return this.teams // Vrátime cacheované dáta
      }

      this.loading = true
      this.error = null

      try {
        const teams = await getTeams()
        this.teams = [...teams]
        this.lastFetched = Date.now()
        console.log('Načítané tímy:', this.teams)
        return this.teams // Vrátime načítané tímy
      } catch (error) {
        console.error('Chyba pri načítavaní tímov:', error)
        this.error = error instanceof Error ? error.message : 'Nepodarilo sa načítať tímy.'
        return [] // Vrátime prázdne pole v prípade chyby
      } finally {
        this.loading = false
      }
    },

    setTeams(teams: Team[]) {
      console.log('Nastavujem tímy:', teams)
      this.teams = [...teams] // Vytvoríme novú inštanciu poľa
      console.log('Nastavené tímy:', this.teams)
    },

    async selectTeam(id: string) {
      this.selectedTeamId = id
      console.log('Vybraný tím:', this.selectedTeam?.name)
      console.log('State:', this.$state)
      console.log('Vybraný tím ID:', this.selectedTeamId) // Kontrola ID
    },

    clearSelectedTeam() {
      this.selectedTeamId = null
    },

    async updateTeam(id: string, newData: Partial<Team>) {
      try {
        await updateTeamService(id, newData)

        // Aktualizácia tímu v store bez nutnosti refetchu
        const index = this.teams.findIndex((team) => team.id === id)
        if (index !== -1) {
          this.teams[index] = { ...this.teams[index], ...newData }
        }
      } catch (error) {
        console.error('Chyba pri aktualizácii tímu:', error)
        this.error = error instanceof Error ? error.message : 'Nepodarilo sa aktualizovať tím.'
      }
    },

    clearTeams() {
      this.teams = []
      this.selectedTeamId = null
      this.lastFetched = 0
      this.error = null
    },
  },
})
