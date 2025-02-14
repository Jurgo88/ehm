<script setup lang="ts">
import { useTeamStore } from '../stores/teamsStore';
import { onMounted } from 'vue';
import TeamList from '@/components/TeamList.vue';

// const teamStore = useTeamStore();

// onMounted(() => {
//   teamStore.loadTeams();
// });
</script>

<template>
  <div>
    <h2>Hokejové tímy View </h2>

    <TeamList />
  </div>
</template>
