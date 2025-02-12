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

import { supabase } from '@/supabase'
import type { Team } from '@/types/Team'

/**
 * Načíta všetky tímy z databázy.
 * @returns Pole tímov.
 */
export async function getTeams(): Promise<Team[]> {
  try {
    const { data, error } = await supabase.from('teams').select('*')

    if (error) {
      console.error('Error fetching teams:', error)
      throw new Error('Failed to fetch teams')
    }

    return data ?? []
  } catch (error) {
    console.error('Unexpected error in getTeams:', error)
    throw error
  }
}

/**
 * Načíta konkrétny tím podľa ID.
 * @param id ID tímu.
 * @returns Objekt tímu alebo null.
 */
export async function getTeamById(id: string): Promise<Team | null> {
  try {
    const { data, error } = await supabase.from('teams').select('*').eq('id', id).single()

    if (error) {
      console.error('Error fetching team by ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error in getTeamById:', error)
    throw error
  }
}
