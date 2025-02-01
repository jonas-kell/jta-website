<template>
    <div :class="{ 'app-dark': appStore.dark, 'app-light': !appStore.dark }" class="app-container">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useAppStore from "./app-store";

    const appStore = useAppStore();
</script>

<style scoped></style>
