<template><router-view></router-view></template>

<script setup lang="ts">
    import useAppStore from "./app-store";

    useAppStore();
</script>

<style scoped></style>
