// import { supabase } from '@/supabase'
// import type { Team } from '@/types/Team'

// export async function fetchTeams(): Promise<Team[]> {
//   try {
//     const { data, error } = await supabase.from('teams').select('*')
//     console.log('data fetched', data)

//     if (error) {
//       console.error('Error fetching teams:', error)
//       throw error
//     }

//     return data || []
//   } catch (error) {
//     console.error('Error in fetchTeams service:', error)
//     throw error
//   }
// }

// import { supabase } from '@/supabase'
// import type { Team } from '@/types/Team'

// /**
//  * Načíta všetky tímy z databázy.
//  * @returns Pole tímov.
//  */
// export async function getTeams(): Promise<Team[]> {
//   try {
//     const { data, error } = await supabase.from('teams').select('*')

//     if (error) {
//       console.error('Error fetching teams:', error)
//       throw new Error('Failed to fetch teams')
//     }

//     return data ?? []
//   } catch (error) {
//     console.error('Unexpected error in getTeams:', error)
//     throw error
//   }
// }

// /**
//  * Načíta konkrétny tím podľa ID.
//  * @param id ID tímu.
//  * @returns Objekt tímu alebo null.
//  */
// export async function getTeamById(id: string): Promise<Team | null> {
//   try {
//     const { data, error } = await supabase.from('teams').select('*').eq('id', id).single()

//     if (error) {
//       console.error('Error fetching team by ID:', error)
//       return null
//     }

//     return data
//   } catch (error) {
//     console.error('Unexpected error in getTeamById:', error)
//     throw error
//   }
// }

// import { supabase } from '../supabase'
// import type { Team } from '@/types/Team'

// /**
//  * Získa všetky tímy z databázy.
//  * @returns Pole tímov alebo prázdne pole v prípade chyby.
//  */
// export const getTeams = async (): Promise<Team[]> => {
//   const { data, error } = await supabase.from('teams').select('*')
//   if (error) throw error
//   return data ?? []
// }

// /**
//  * Získa konkrétny tím podľa ID.
//  * @param id ID tímu.
//  * @returns Objekt tímu alebo null.
//  */
// export const getTeamById = async (id: string): Promise<Team | null> => {
//   const { data, error } = await supabase.from('teams').select('*').eq('id', id).single()
//   if (error) throw error
//   return data
// }

// /**
//  * Upraví existujúci tím.
//  * @param id ID tímu.
//  * @returns Objekt upraveného tímu.
//  */

// export const updateTeam = async (id: string, newData: Partial<Team>): Promise<boolean> => {
//   const { error } = await supabase.from('teams').update(newData).eq('id', id)
//   if (error) {
//     console.error('Chyba pri aktualizácii tímu:', error)
//     return false
//   }
//   return true
// }

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
