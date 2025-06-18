<template>
    <div :class="{ 'app-dark': appStore.dark, 'app-light': !appStore.dark }" class="app-container">
        <div class="main-spacer" v-if="appStore.standalone">&nbsp;</div>
        <div class="content">
            <router-view></router-view>
        </div>
        <template v-if="appStore.standalone">
            <div class="spacer"></div>
            <div class="main-spacer">&nbsp;</div>
            <div class="privacy-link-container">
                <router-link to="/imprint">Impressum / Datenschutz</router-link>
            </div>
            <div class="main-spacer">&nbsp;</div>
        </template>
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
