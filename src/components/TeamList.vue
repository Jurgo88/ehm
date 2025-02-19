<!-- <script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTeamStore } from '../stores/teamsStore';
import { usePlayerStore } from '../stores/playerStore';
import PlayerList from '@/components/PlayerList.vue';

const teamStore = useTeamStore();
// const playerStore = usePlayerStore();
const selectedTeamId = ref<string | null>(null);

const teams = computed(() => teamStore.teams);
// const players = computed(() => playerStore.players); // Hráči vybraného tímu

onMounted(async () => {
    console.log('Načítavam tímy...');
    await teamStore.loadTeams();
});

/**
 * Funkcia na výber tímu a načítanie jeho hráčov.
 * @param teamId ID tímu
 */
const selectTeam = async (teamId: string) => {
    console.log('Vybraný tím:', teamId);
    selectedTeamId.value = teamId;
    // await playerStore.loadPlayersByTeam(teamId);
};
</script>

<template>
    <div>
        <h2>Hokejové tímy</h2>
        <div v-if="teamStore.loading">Načítavam tímy...</div>
        <div v-if="teamStore.error">{{ teamStore.error }}</div>

        <ul v-if="teams.length > 0">
            <li v-for="team in teams" :key="team.id" @click="selectTeam(team.id)" class="team-item">
                <img :src="team.logo ?? ''" alt="logo" width="50" />
                {{ team.name }}
            </li>
        </ul>

        <player-list v-if="selectedTeamId" :team="teams.find(team => team.id === selectedTeamId)" />

        <div v-if="selectedTeamId">
            <h3>Hráči tímu</h3>
            <ul v-if="players.length > 0">
                <li v-for="player in players" :key="player.id">
                    {{ player.name }} - #{{ player.number }} ({{ player.position }})
                </li>
            </ul>
            <div v-else>Žiadni hráči v tomto tíme.</div>
        </div>
    </div>
</template>

<style scoped>
.team-item {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    transition: background 0.3s;
}

.team-item:hover {
    background: #f4f4f4;
}
</style> -->

<script setup lang="ts">
import { useTeams } from '../hooks/useTeams'
import { useTeamStore } from '../stores/teamsStore'
import { usePlayerStore } from '../stores/playerStore.ts';
import PlayerList from '@/components/PlayerList.vue';
import TeamDetail from './TeamDetail.vue';
import { ref, onMounted, watch } from 'vue'
import type { Team } from '../types/Team'
import { useRouter } from 'vue-router';
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

        <!-- <team-detail v-if="teamStore.selectedTeamId" :selectedTeam="teamStore.selectedTeam" /> -->

        <!-- <player-list v-if="teamStore.selectedTeamId" :team="teamStore.selectedTeam" /> -->
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
