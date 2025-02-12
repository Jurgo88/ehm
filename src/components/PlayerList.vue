<template>
    <div>
        <h2>Hráči tímu {{ team ? team.name : '' }}</h2>
        <div v-if="loading">Načítavam hráčov...</div>
        <div v-if="error">{{ error }}</div>
        <ul v-if="players.length > 0">
            <li v-for="player in players" :key="player.id">
                {{ player.name }}
            </li>
        </ul>
        <div v-else-if="!loading && !error">Žiadni hráči nenájdení.</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, } from 'vue';
import type { Player } from '../types/Player';
import type { Team } from '../types/Team';

const props = defineProps<{
    team: Team | null;
}>();

const players = ref<Player[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Tu bude logika pre fetchovanie hráčov pre vybraný tím
onMounted(() => {
    if (props.team) {
        // Fetch hráčov pre props.team
    }
});
</script>