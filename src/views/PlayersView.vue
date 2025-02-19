<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPlayers } from '../services/playersService';
import type { Player } from '../types/Player';
import PlayerDetail from '../components/PlayerDetail.vue';



const players = ref<Player[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        players.value = await fetchPlayers();
    } catch (err) {
        error.value = (err as Error).message; // Zobraz chybu používateľovi
        console.error("Chyba v komponente:", err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <PlayerDetail />

</template>
