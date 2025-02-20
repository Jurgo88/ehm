import api from '@/services/api'
import type { Player } from '@/types/Player'

export async function fetchPlayers(): Promise<Player[]> {
  try {
    console.log('fetchPlayers')
    const { data } = await api.get('/players')
    return data
  } catch (error) {
    console.error('Chyba pri načítaní hráčov:', error)
    throw error
  }
}

export async function fetchPlayersByTeam(teamId: string): Promise<Player[]> {
  try {
    console.log('fetchPlayersByTeam')
    const { data } = await api.get('/players', {
      params: { team_id: `eq.${teamId}` },
    })
    console.log('data', data)
    return data
  } catch (error) {
    console.error('Chyba pri načítaní hráčov tímu:', error)
    throw error
  }
}
