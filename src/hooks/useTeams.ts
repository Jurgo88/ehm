import { useQuery } from '@tanstack/vue-query'
import { getTeams, getTeamById } from '@/services/teamsService'
import { useTeamStore } from '@/stores/teamsStore'

/**
 * Hook na získanie všetkých tímov.
 */
export const useTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 60 * 24, // Cache platná 24 hodín
  })
}

/**
 * Hook na získanie všetkých tímov z Pinia store.
 */
export const useTeamsStore = () => {
  const store = useTeamStore()

  return {
    ...store,
    loadTeams: () => store.loadTeams(),
  }
}

export const useTeamsWithStore = () => {
  const teamStore = useTeamStore()

  const { isLoading, error, data } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 60 * 24,
  })

  if (data) {
    teamStore.setTeams(data)
  }

  return { isLoading, error, teams: teamStore.teams }
}

/**
 * Hook na získanie konkrétneho tímu podľa ID.
 */
export const useTeamById = (id: string) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => getTeamById(id),
    enabled: !!id, // Query sa spustí len ak existuje ID
  })
}
