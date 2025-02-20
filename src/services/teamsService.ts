import api from './api'
import type { Team } from '@/types/Team'

export const getTeams = async (): Promise<Team[]> => {
  try {
    console.log('Nacitavam nacitavam z teamsService')
    const response = await api.get('/teams')
    return response.data
  } catch (error: any) {
    console.error('Chyba pri načítavaní tímov:', error)
    return []
  }
}

export const getTeamById = async (id: string): Promise<Team | null> => {
  try {
    const response = await api.get(`/teams/${id}`) // Použitie api.get s id v URL
    return response.data
  } catch (error: any) {
    console.error('Chyba pri načítavaní tímu:', error)
    return null
  }
}

export const updateTeam = async (id: string, newData: Partial<Team>): Promise<boolean> => {
  try {
    const response = await api.patch(`/teams/${id}`, newData)
    return response.status === 200 // Kontrolujeme úspešný status kód
  } catch (error: any) {
    console.error('Chyba pri aktualizácii tímu:', error)
    return false
  }
}
