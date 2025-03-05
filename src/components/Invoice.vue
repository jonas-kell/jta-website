<template>
    <h2>Rechnungs-Generator</h2>

    <div class="form-body">
        <p>Eigener Name: <input type="text" v-model="ownName" /></p>
        <p>Eigene Straße: <input type="text" v-model="ownStreet" /></p>
        <p>Eigene Stadt: <input type="text" v-model="ownCity" /></p>
        <p>Eigene Tel.: <input type="text" v-model="ownTel" /></p>
        <p>Eigene Mail: <input type="text" v-model="ownMail" /></p>
    </div>

    <button @click="generatePDF">Rechnung Generieren</button>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";
    const appStore = useAppStore();
    appStore.dark; // just that the app store works and doesn't give unused errors
    import { jsPDF } from "jspdf";
    import imageData from "./../public/Logo-Schwaben.png?base64";
    import { ref } from "vue";

    const OBFUSCATION_KEY = 42; // Any number (should be consistent)
    // the addresses and semi-personal default-data are obfuscated in the source to not get it web-scraped (easily)

    const ownName = ref(deobfuscate("YEVES1kKYU9GRg=="));
    const ownStreet = ref(deobfuscate("eUlCS19dQ09ZWV5YBAobGA=="));
    const ownCity = ref(deobfuscate("EhwSGRoKeUlCXUtIR9ZESUJPRA=="));
    const ownTel = ref(deobfuscate("AR4TChsfHRkKGBwbHxsYGg=="));
    const ownMail = ref(deobfuscate("UE9DXkRLQkdPakhGXAdZSUJdS0hPRAROTw=="));

    function generatePDF() {
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

    function obfuscate(text: string) {
        if (text == "") {
            return "";
        }

        return btoa([...text].map((c) => String.fromCharCode(c.charCodeAt(0) ^ OBFUSCATION_KEY)).join(""));
    }

    function deobfuscate(encoded: string) {
        if (encoded == "") {
            return "";
        }

        return [...atob(encoded)].map((c) => String.fromCharCode(c.charCodeAt(0) ^ OBFUSCATION_KEY)).join("");
    }

    // Example Usage for the obfuscation (do not commit the "secret" things obviously)
    const original = "testtesttest";
    const obfuscated = obfuscate(original);
    console.log(obfuscated);
</script>

<style scoped>
    .form-body {
        text-align: left;
        width: 90vw;
        min-width: 500px;
        margin-left: 2em;
        margin-right: 2em;
        padding-left: 2em;
        padding-right: 2em;
    }
</style>
