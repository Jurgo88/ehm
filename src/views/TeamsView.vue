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
    <h2>Hokejové tímy </h2>
    <!-- <ul>
      <li v-for="team in teamStore.teams" :key="team.id">
        <img :src="team.logo ?? ''" alt="logo" width="50" />
        {{ team.name }}
        <router-link :to="{ name: 'TeamView', params: { id: team.id } }">Detail</router-link>
      </li>
    </ul> -->
    <TeamList />
  </div>
</template>
