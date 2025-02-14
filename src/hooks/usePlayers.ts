import { useQuery } from '@tanstack/vue-query'
import { fetchPlayers, fetchPlayersByTeam } from '@/services/playersService'
// import { usePlayerStore } from '../stores/playerStore'

/**
 * Hook na získanie všetkých hráčov.
 */
export const usePlayers = () => {
  console.log('usePlayers')
  return useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 60 * 24, // Cache platná 24 hodín
  })
}

/**
 * Hook na získanie konkrétneho hráča podľa ID teamu.
 */

export const usePlayersByTeamId = (teamId: string) => {
  console.log('usePlayersByTeamId')
  //   const playerStore = usePlayerStore() // Ak používaš store pre hráčov

  //   const { isLoading, error, data } = useQuery({
  //     queryKey: ['players', teamId], // Dôležité: queryKey obsahuje teamId
  //     queryFn: () => fetchPlayersByTeam(teamId),
  //     enabled: !!teamId, // Načítavanie len ak je teamId definované
  //     staleTime: 1000 * 60 * 60 * 24, // Cache platná 24 hodín (príklad)
  //   })

  //   if (data) {
  //     playerStore.setPlayers(data)
  //   }

  //   return { isLoading, error, players: playerStore.players } // Vraciame hráčov zo store
}

/**
 * Hook na získanie  hráčov z teamuy podla ID z Pinia store.
 */
// export const usePlayersByTeamIdStore = (teamId: string) => {
//   const store = usePlayerStore()

//   return {
//     ...store,
//     loadPlayers: () => store.loadPlayers(teamId),
//   }
// }

// /**
//  * Hook na získanie všetkých hráčov z Pinia store.
//  */
// export const usePlayersStore = () => {
//   const store = usePlayerStore()

//   return {
//     ...store,
//     loadPlayers: () => store.loadPlayers(),
//   }
// }

// export const usePlayersWithStore = () => {
//   const playerStore = usePlayerStore()

//   const { isLoading, error, data } = useQuery({
//     queryKey: ['players'],
//     queryFn: getPlayers,
//     staleTime: 1000 * 60 * 60 * 24,
//   })

//   if (data) {
//     playerStore.setPlayers(data)
//   }

//   return { isLoading, error, players: playerStore.players }
// }

// /**
//  * Hook na získanie konkrétneho hráča podľa ID.
//  */
// export const usePlayerById = (id: string) => {
//   return useQuery({
//     queryKey: ['player', id],
//     queryFn: () => getPlayerById(id),
//     enabled: !!id, // Query sa spustí len ak existuje ID
//   })
// }
