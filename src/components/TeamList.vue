<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTeamStore } from '../stores/teamsStore';
// import { usePlayerStore } from '../stores/playerStore';

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

        <!-- <div v-if="selectedTeamId">
            <h3>Hráči tímu</h3>
            <ul v-if="players.length > 0">
                <li v-for="player in players" :key="player.id">
                    {{ player.name }} - #{{ player.number }} ({{ player.position }})
                </li>
            </ul>
            <div v-else>Žiadni hráči v tomto tíme.</div>
        </div> -->
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
</style>
