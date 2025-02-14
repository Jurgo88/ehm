// import { supabase } from '@/supabase'
// import type { Player } from '@/types/Player'

// export async function getPlayers(): Promise<Player[]> {
//   // TypeScript: definuj návratový typ
//   try {
//     const { data, error } = await supabase.from('players').select('*')

//     if (error) {
//       console.error('Error fetching players:', error)
//       throw error
//     }

//     return data || []
//   } catch (error) {
//     console.error('Error in getPlayers service:', error)
//     throw error
//   }
// }

// export async function getPlayerById(id: string): Promise<Player | null> {
//   // Pre TypeScript
//   try {
//     const { data, error } = await supabase.from('players').select('*').eq('id', id) // Filtruj podľa ID

//     if (error) {
//       console.error('Error fetching player by ID:', error)
//       throw error
//     }

//     return data ? data[0] : null // Vráť null, ak hráč neexistuje
//   } catch (error) {
//     console.error('Error in getPlayerById service:', error)
//     throw error
//   }
// }

// import { supabase } from '@/supabase'
// import type { Player } from '@/types/Player'

// /**
//  * Načíta všetkých hráčov.
//  * @returns Pole hráčov.
//  */
// export async function getPlayers(): Promise<Player[]> {
//   try {
//     const { data, error } = await supabase.from('players').select('*')

//     if (error) {
//       console.error('Error fetching players:', error)
//       throw new Error('Failed to fetch players')
//     }

//     return data ?? []
//   } catch (error) {
//     console.error('Unexpected error in getPlayers:', error)
//     throw error
//   }
// }

// /**
//  * Načíta hráčov konkrétneho tímu.
//  * @param teamId ID tímu.
//  * @returns Pole hráčov daného tímu.
//  */
// export async function getPlayersByTeamId(teamId: string): Promise<Player[]> {
//   try {
//     const { data, error } = await supabase.from('players').select('*').eq('team_id', teamId)

//     if (error) {
//       console.error('Error fetching players for team:', error)
//       return []
//     }

//     return data ?? []
//   } catch (error) {
//     console.error('Unexpected error in getPlayersByTeamId:', error)
//     throw error
//   }
// }

// /**
//  * Načíta hráča podľa ID.
//  * @param id ID hráča.
//  * @returns Objekt hráča alebo null.
//  */
// export async function getPlayerById(id: string): Promise<Player | null> {
//   try {
//     const { data, error } = await supabase.from('players').select('*').eq('id', id).single()

//     if (error) {
//       console.error('Error fetching player by ID:', error)
//       return null
//     }

//     return data
//   } catch (error) {
//     console.error('Unexpected error in getPlayerById:', error)
//     throw error
//   }
// }

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
