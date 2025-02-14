<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPlayers } from '../services/playersService';
import type { Player } from '../types/Player';

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
    <div>
        <h2>Hráči pLAYER dETAIL</h2>
        <ul>
            <li v-for="player in players" :key="player.id">
                <!-- <img :src="player.photo" alt="photo" width="50" /> -->
                {{ player.name }}
                {{ player.position }}
                {{ player.overall }}
            </li>
        </ul>
    </div>
</template>
