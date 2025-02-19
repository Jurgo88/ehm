import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPlayersByTeam } from '../services/playersService'
import type { Player } from '../types/Player'

export const usePlayerStore = defineStore('playerStore', () => {
  const players = ref<Player[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadPlayersByTeam = async (teamId: string) => {
    loading.value = true
    error.value = null
    try {
      players.value = await fetchPlayersByTeam(teamId)
    } catch (err) {
      error.value = 'Nepodarilo sa načítať hráčov.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { players, loading, error, loadPlayersByTeam }
})
