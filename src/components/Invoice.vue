<template>
    <h2>Rechnungs-Generator</h2>

    <button @click="test">test</button>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";
    const appStore = useAppStore();
    appStore.dark; // just that the app store works and doesn't give unused errors
    import { jsPDF } from "jspdf";
    import imageData from "./../public/Logo-Schwaben.png?base64";

    function test() {
        console.log("test");

        const doc = new jsPDF();

        doc.text("Hello world!", 10, 10);
        doc.addImage(imageData, "JPG", 20, 20, 100, 100, "Logo", "NONE", 0);
        doc.table(
            40,
            40,
            [
                { test: "asdasdasd", test2: "asd" },
                { test: "asdasdasd", test2: "asd" },
                { test: "asdasdasd", test2: "asd" },
            ],
            ["test", "test2"],
            {}
        );

        doc.save("a4.pdf");
    }
</script>

<style scoped></style>
