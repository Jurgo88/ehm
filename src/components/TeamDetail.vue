<script setup lang="ts">
import { usePlayers, usePlayersByTeamId } from '../hooks/usePlayers';
import { useTeamStore } from '../stores/teamsStore';
import { defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PlayerList from './PlayerList.vue';
import type { Team } from '../types/Team';


const props = defineProps<{
    selectedTeam: Team;
}>();
const teamStore = useTeamStore();
const route = useRoute();
const teamId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id; // Prístup k ID tímu z URL


onMounted(() => {
    console.log('Načítavam hráčov z tímu:', teamId);
    if (teamId) {
        if (!teamStore.teams.length) {
            teamStore.loadTeams();
        }
        teamStore.selectTeam(teamId);
    }
    console.log('Selected team:', props.selectedTeam);
});

</script>
<template>
    <div>
        <h2>Detail tímu: {{ teamStore.teams.find(team => team.id === teamId)?.name ?? '' }}</h2>
        <h3>Tréner: {{ teamStore.selectedTeam?.coach }}</h3>
        <player-list v-if="teamId" :team="teamStore.selectedTeam" :selectedTeamId="teamId" />
    </div>
</template>
