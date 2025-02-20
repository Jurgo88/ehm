<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPlayersByTeam } from '../services/playersService';
import type { Player } from '../types/Player';
import { useRoute } from 'vue-router';

const route = useRoute();

const players = ref<Player[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const loadPlayers = async (teamId: string) => {
    console.log("loadPlayers in PlayerList", teamId);
    loading.value = true;
    error.value = null;

    try {
        players.value = await fetchPlayersByTeam(teamId);
    } catch (err: unknown) {
        error.value = (err as Error).message;
        console.error("Chyba pri načítavaní hráčov:", err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    const teamId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (teamId) {
        loadPlayers(teamId);
    }
});
</script>

<template>
    <div>
        <h2>Hráči tímu</h2>
        <div v-if="loading">Načítavam hráčov...</div>
        <div v-if="error">{{ error }}</div>
        <ul v-if="players.length">
            <li v-for="player in players" :key="player.id">
                {{ player.name }}
            </li>
        </ul>
        <div v-else-if="!loading && !error">Žiadni hráči nenájdení.</div>
    </div>
</template>