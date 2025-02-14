// import { defineStore } from 'pinia'
// import { getTeams } from '@/services/teamsService'
// import { type Team } from '@/types/Team'

// export const useTeamStore = defineStore('teamStore', {
//   state: () => ({
//     teams: [] as Team[],
//     loading: false,
//     error: null as string | null,
//   }),
//   actions: {
//     async loadTeams() {
//       this.loading = true
//       this.error = null

//       try {
//         this.teams = await getTeams()
//         this.teams = [...this.teams] // TypeScript: skopíruj dáta do nového poľa
//       } catch (error: unknown) {
//         console.error('Chyba pri načítavaní tímov:', error)
//         if (error instanceof Error) {
//           this.error = error.message || 'Nastala chyba pri načítavaní tímov.'
//         } else {
//           this.error = 'Nastala chyba pri načítavaní tímov.'
//         }
//       } finally {
//         this.loading = false
//       }
//     },
//   },
// })

// import { defineStore } from 'pinia'
// import { getTeams } from '@/services/teamsService'
// import { type Team } from '@/types/Team'

// export const useTeamStore = defineStore('teamStore', {
//   state: () => ({
//     teams: [] as Team[],
//     loading: false,
//     error: null as string | null,
//     lastFetched: 0, // Timestamp pre kontrolu cache
//   }),

//   actions: {
//     async loadTeams(forceRefresh = false) {
//       if (!forceRefresh && this.teams.length > 0 && Date.now() - this.lastFetched < 1000 * 60) {
//         console.log('Používam cacheované dáta')
//         return
//       }

//       this.loading = true
//       this.error = null

//       try {
//         const teams = await getTeams()
//         this.teams = [...teams] // Kopírovanie dát
//         this.lastFetched = Date.now() // Uloženie času posledného fetchu
//       } catch (error) {
//         console.error('Chyba pri načítavaní tímov:', error)
//         this.error = error instanceof Error ? error.message : 'Nepodarilo sa načítať tímy.'
//       } finally {
//         this.loading = false
//       }
//     },
//   },
// })

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
    async loadTeams(forceRefresh = false) {
      console.log('loadteams in store')
      if (!forceRefresh && this.teams.length > 0 && Date.now() - this.lastFetched < 1000 * 60) {
        console.log('Používam cacheované dáta')
        return
      }

      this.loading = true
      this.error = null

      try {
        const teams = await getTeams()
        this.teams = [...teams] // Kopírovanie dát
        this.lastFetched = Date.now() // Uloženie času posledného fetchu
        console.log('Načítané tímy:', this.teams)
      } catch (error) {
        console.error('Chyba pri načítavaní tímov:', error)
        this.error = error instanceof Error ? error.message : 'Nepodarilo sa načítať tímy.'
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

      // Ak už máme dáta v cache, nemusíme fetchovať
      // if (this.teams.some((team) => team.id === id)) return

      //save the selected team to the store

      // try {
      //   console.log('Načítaný tím:', team);
      //   const team = await getTeamById(id)
      //   if (team) {
      //     this.teams.push(team) // Pridáme do store, ak tam ešte nie je
      //   }
      // } catch (error) {
      //   console.error('Chyba pri načítavaní tímu:', error)
      //   this.error = error instanceof Error ? error.message : 'Nepodarilo sa načítať tím.'
      // }
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
