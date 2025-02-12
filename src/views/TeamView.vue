<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/stores/teamsStore';
import { onMounted, ref, computed } from 'vue';
import type { Team } from '@/types/Team';

const route = useRoute();
const teamStore = useTeamStore();
const teamId = route.params.id; // Prístup k ID tímu z URL


const team = ref<Team | null>(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        loading.value = true;
        const teams = await teamStore.loadTeams(); // Načítame tímy zo store
        team.value = teams.find((t) => t.id === teamId); // Nájdeme tím podľa ID
        if (!team.value) {
            throw new Error('Team not found')
        }
    } catch (err: any) {
        error.value = err.message
        console.error(err)
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div>
        <h1>Detail tímu</h1>
        <div v-if="team">
            <h2>{{ team.name }}</h2>
            <img :src="team.logo ?? ''" alt="logo" width="100" />
            <p>ID: {{ team.id }}</p>
        </div>
        <div v-else-if="loading">Načítavam tím...</div>
        <div v-else>{{ error }}</div>
    </div>
</template>