<script setup lang="ts">
import { useTeams } from '../hooks/useTeams'
import { useTeamStore } from '../stores/teamsStore'

import { onMounted, watch } from 'vue'
import type { Team } from '../types/Team'
import router from '@/router';

const { data: teams, isLoading, error } = useTeams()
const teamStore = useTeamStore()



const selectTeam = (team: Team) => {
    console.log('Selected team in teamList:', team.name)
    teamStore.selectTeam(team.id)
    router.push(`/teams/${team.id}`)
}

watch(teams, (newTeams) => {
    if (newTeams) {
        console.log('Teams in teamList:', newTeams);
        teamStore.setTeams(newTeams as Team[]);
        console.log('Teams in teamList:', newTeams);
    }
});

onMounted(() => {
    console.log('Načítavam tímy...');
    if (!teams.value && !isLoading.value) { // Kontrola, či teams ešte nie sú načítané a načítavanie neprebieha
        console.log('Teams are not yet loaded.');
    }
})

</script>

<template>
    <div>
        <h2>Hokejové tímy</h2>
        <div v-if="isLoading">Načítavam tímy...</div>
        <div v-if="error">{{ error.message }}</div>

        <ul v-if="teams">
            <li v-for="team in teams" :key="team.id" @click="selectTeam(team)">
                <img :src="team.logo ?? ''" alt="logo" width="50" />
                {{ team.name }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
li {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    transition: background 0.3s;
}

li:hover {
    background: #c3c3c3;
}
</style>
