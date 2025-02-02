<template>
    <div :class="{ 'app-dark': appStore.dark, 'app-light': !appStore.dark }" class="app-container">
        <div class="content">
            <div class="main-spacer" v-if="appStore.standalone">&nbsp;</div>

            <router-view></router-view>

            <template v-if="appStore.standalone">
                <div class="spacer"></div>
                <div class="main-spacer">&nbsp;</div>
                <a href="https://blv-sport.de/impressum">Impressum / Datenschutz</a>
                <div class="main-spacer">&nbsp;</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useAppStore from "./app-store";

    const appStore = useAppStore();
</script>

<style scoped>
    .main-spacer {
        width: 100%;
        height: 2em;
    }
</style>
