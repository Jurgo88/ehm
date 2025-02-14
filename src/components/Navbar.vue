<script setup lang="ts">
</script>

<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">🏠 Home</router-link></li>
            <li><router-link to="/teams">🏒 Teams</router-link></li>
            <li><router-link to="/players">📖 Players</router-link></li>
        </ul>
    </nav>
</template>

<style scoped>
.navbar {
    background: #1e3a8a;
    padding: 10px;
    width: 100%;
}

.navbar ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
}

.navbar a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}
</style>
