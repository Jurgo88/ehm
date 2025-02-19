<script setup lang="ts">
import Navbar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <div class="layout">
        <!-- Navigácia -->
        <Navbar />

        <!-- Hlavný obsah (dynamický podľa cesty) -->
        <main class="content">
            <router-view />
        </main>

        <!-- Pätička -->
        <Footer />
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
    padding: 20px;
}
</style>
