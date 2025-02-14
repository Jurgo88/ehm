<script setup lang="ts">
import { usePlayers, usePlayersByTeamId } from '../hooks/usePlayers';
import { useTeamStore } from '../stores/teamsStore';
import { defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PlayerList from './PlayerList.vue';


const props = defineProps<{
    selectedTeam: any; // Typ pre selectedTeam
}>();
const teamStore = useTeamStore();
const route = useRoute();
const teamId = route.params.id; // Prístup k ID tímu z URL

// const { data: players, isLoading, error } = usePlayersByTeamId(teamId); // Načítavame detail tímu


onMounted(() => {
    console.log('Načítavam hráčov z tímu:', teamId);
    if (teamId) {
        if (!teamStore.teams.length) {
            teamStore.loadTeams();
        }
        teamStore.selectTeam(teamId);
    }
    console.log('Selected team:', props.selectedTeam);
    // console.log('Hráči:', players);
    // fetchPlayers();
});

// const { data: players, isLoading, error } = usePlayers();
// const { isLoading, error, data: team } = usePlayersByTeamId(teamId); // Načítavame detail tímu



// const { isLoading: playersLoading, error: playersError, players } = usePlayersByTeamId(props.selectedTeam?.id);
</script>
<template>
    <div>
        <h2>Detail tímu: {{ teamStore.teams.find(team => team.id === teamId)?.name ?? '' }}</h2>
        <h3>Tréner: {{ teamStore.selectedTeam?.coach }}</h3>
        <player-list v-if="teamId" :team="teamStore.selectedTeam" :selectedTeamId="teamId" />
        <!-- <div v-if="playersLoading">Načítavam hráčov...</div>
        <div v-if="playersError">{{ playersError }}</div>
        <ul v-if="players && players.length > 0">
            <li v-for="player in players" :key="player.id">
                {{ player.name }}
            </li>
        </ul>
        <div v-else-if="!playersLoading && !playersError">Žiadni hráči nenájdení.</div> -->
    </div>
</template>
