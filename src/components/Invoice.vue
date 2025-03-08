<template>
    <h2>Rechnungs-Generator</h2>

    <div class="form-body">
        <p>Eigener Name: <input type="text" v-model="ownName" /></p>
        <p>Eigene Straße: <input type="text" v-model="ownStreet" /></p>
        <p>Eigene Stadt: <input type="text" v-model="ownCity" /></p>
        <p>Eigene Tel.: <input type="text" v-model="ownTel" /></p>
        <p>Eigene Mail: <input type="text" v-model="ownMail" /></p>
        <p>Eigene IBAN: <input type="text" v-model="ownIBAN" /></p>
        <br />
        <p>Empfänger Name: <input type="text" v-model="recipientName" /></p>
        <p>Empfänger Verein: <input type="text" v-model="recipientOrganization" /></p>
        <p>Empfänger Adresse: <input type="text" v-model="recipientAddress" /></p>
        <p>Tag des Einsatzes: <input type="date" v-model="dateOfOperation" /></p>
        <br />
        <p>Titel Rechnung: <input type="text" v-model="title" /></p>
        <p>Endrechnung (sonst = Angebot): <input type="checkbox" v-model="isFinalStatement" /></p>
        <p>Rechnungsdatum: <input type="date" v-model="date" /></p>
        <p>RechnungsNr: <input type="text" v-model="reNr" /></p>

        <h3>Rechnungsinhalte <button @click="addEntry">+</button></h3>
        <p v-for="entry in entries" :key="entry.id">
            <button @click="removeEntry(entry.id)">x</button> <input type="text" placeholder="Position" v-model="entry.topic" />
            <input type="number" placeholder="Cost" v-model="entry.price" step="0.01" />
            x <input type="number" placeholder="Amount" v-model="entry.amount" min="0" step="1" />
        </p>
    </div>

    <button @click="generatePDF">Rechnung Generieren</button>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";
    const appStore = useAppStore();
    appStore.dark; // just that the app store works and doesn't give unused errors
    import { jsPDF } from "jspdf";
    import imageData from "./../public/Logo-Schwaben.png?base64";
    import { ref, watch } from "vue";
    import {
        costMainSystem,
        costDisplay,
        costMeasurementDevices,
        costTimingOfficiantsPerH,
        costTransport,
        costTimingCaravan,
        costSupportPerH,
    } from "./../costs.ts";

    const OBFUSCATION_KEY = 42; // Any number (should be consistent)
    // the addresses and semi-personal default-data are obfuscated in the source to not get it web-scraped (easily)

    const ownName = ref(deobfuscate("YEVES1kKYU9GRg=="));
    const ownStreet = ref(deobfuscate("eUlCS19dQ09ZWV5YBAobGA=="));
    const ownCity = ref(deobfuscate("EhwSGRoKeUlCXUtIR9ZESUJPRA=="));
    const ownTel = ref(deobfuscate("AR4TChsfHRkKGBwbHxsYGg=="));
    const ownMail = ref(deobfuscate("UE9DXkRLQkdPakhGXAdZSUJdS0hPRAROTw=="));
    const ownIBAN = ref(deobfuscate("bm8aEgobGBoZChoaGhoKGxgaHwoYHBkaChsZ"));

    const recipientName = ref("");
    const recipientOrganization = ref("");
    const recipientAddress = ref("");
    const dateOfOperation = ref(new Date().toISOString().split("T")[0]);

    const title = ref("Rechnung");
    const isFinalStatement = ref(true);
    watch(isFinalStatement, () => {
        if (isFinalStatement.value) {
            title.value = "Rechnung";
        } else {
            title.value = "Vorläufiges Angebot";
        }
    });
    const date = ref(new Date().toISOString().split("T")[0]);
    const reNr = ref("");

    type InvoiceEntry = {
        id: number;
        topic: string;
        price: number;
        amount: number;
    };

    const entries = ref([] as InvoiceEntry[]);
    entries.value.push({
        id: 1,
        topic: "Mietkosten Zeitnahmeanlage",
        amount: 1,
        price: costMainSystem,
    });
    entries.value.push({
        id: 2,
        topic: "Mietkosten Anzeigetafel",
        amount: 1,
        price: costDisplay,
    });
    entries.value.push({
        id: 3,
        topic: "Mietkosten Geräte-Mess-Set",
        amount: 1,
        price: costMeasurementDevices,
    });
    entries.value.push({
        id: 4,
        topic: "Zeitnahme-Verantwortlicher pro h",
        amount: 0,
        price: costTimingOfficiantsPerH,
    });
    entries.value.push({
        id: 5,
        topic: "Transportkosten/Anfahrt",
        amount: 0,
        price: costTransport,
    });
    entries.value.push({
        id: 6,
        topic: "Zeitnahme-Wohnmobil",
        amount: 0,
        price: costTimingCaravan,
    });
    entries.value.push({
        id: 7,
        topic: "Unterstützung/Problemlösung pro h",
        amount: 0,
        price: costSupportPerH,
    });

    function removeEntry(id: number) {
        entries.value = entries.value.filter((e) => e.id != id);
    }
    function addEntry() {
        let newId = 0;
        entries.value.forEach((e) => {
            if (e.id >= newId) {
                newId = e.id + 1;
            }
        });

        entries.value.push({
            id: newId,
            topic: "",
            amount: 1,
            price: 0,
        });
    }

    function formatPrice(num: number) {
        return num.toFixed(2).replace(".", ",") + " €";
    }

    function generatePDF() {
        const doc = new jsPDF();
        // A4 page
        const PAGE_HEIGHT = 297;
        const PAGE_WIDTH = 210;
        const TEXT_FONT = "times";
        const TEXT_SIZE = 13;
        const PAGE_MARGIN = 20;
        const LINE_SKIP = 8;

        doc.setFont(TEXT_FONT, "normal"); // also bold or italic

        // address header
        doc.setFontSize(TEXT_SIZE);
        const rightOffsetAddress = 75;
        const addressTopDif = 15;
        doc.setFont(TEXT_FONT, "bold");
        doc.text(ownName.value, PAGE_WIDTH - rightOffsetAddress, addressTopDif + 0 * LINE_SKIP, {});
        doc.setFont(TEXT_FONT, "normal");
        doc.text(ownStreet.value, PAGE_WIDTH - rightOffsetAddress, addressTopDif + 1 * LINE_SKIP, {});
        doc.text(ownCity.value, PAGE_WIDTH - rightOffsetAddress, addressTopDif + 2 * LINE_SKIP, {});
        doc.setFont(TEXT_FONT, "italic");
        doc.text(ownTel.value, PAGE_WIDTH - rightOffsetAddress, addressTopDif + 3 * LINE_SKIP, {});
        doc.text(ownMail.value, PAGE_WIDTH - rightOffsetAddress, addressTopDif + 4 * LINE_SKIP, {});
        doc.setFont(TEXT_FONT, "normal");

        doc.setFont(TEXT_FONT, "bold");
        doc.text(recipientName.value, PAGE_MARGIN, addressTopDif + 5 * LINE_SKIP, {});
        doc.setFont(TEXT_FONT, "normal");
        doc.text(recipientOrganization.value, PAGE_MARGIN, addressTopDif + 6 * LINE_SKIP, {});
        doc.text(recipientAddress.value, PAGE_MARGIN, addressTopDif + 7 * LINE_SKIP, {});

        // logo top left
        const imgRatio = 135 / 231;
        const imgWidth = 45;
        doc.addImage(imageData, "JPG", 20, 10, imgWidth, imgWidth * imgRatio, "Logo", "NONE", 0);

        // Main body
        const [year, month, day] = date.value.split("-");
        const dateString = `${day}.${month}.${year}`;
        let descriptionStr = "";
        if (reNr.value == "") {
            descriptionStr = dateString;
        } else {
            descriptionStr = "ReNr.: " + reNr.value + "  -  " + dateString;
        }
        const MAIN_BODY_START_Y = addressTopDif + 9 * LINE_SKIP;
        doc.setFont(TEXT_FONT, "bold");
        doc.setFontSize(TEXT_SIZE * 2);
        doc.text(title.value, PAGE_WIDTH - PAGE_MARGIN, MAIN_BODY_START_Y, { align: "right" });
        doc.setFontSize(TEXT_SIZE);
        doc.setFont(TEXT_FONT, "italic");
        doc.text(descriptionStr, PAGE_WIDTH - PAGE_MARGIN, MAIN_BODY_START_Y + LINE_SKIP * 1, { align: "right" });
        doc.setFont(TEXT_FONT, "normal");
        const [operationYear, operationMonth, operationDay] = dateOfOperation.value.split("-");
        const operationDateString = `${operationDay}.${operationMonth}.${operationYear}`;
        let orderType = "";
        if (isFinalStatement.value) {
            orderType = "berechnet";
        } else {
            orderType = "gebucht";
        }
        const mainExplanation = `Für den Einsatz am ${operationDateString} werden folgende Einzelleistungen ${orderType}:`;
        doc.text(mainExplanation, PAGE_MARGIN, MAIN_BODY_START_Y + LINE_SKIP * 2, { align: "left" });

        const topicKey = "Kostenstelle";
        const entryCostKey = "Satz";
        const entryAmountKey = "Anzahl";
        const subtotalKey = "Gesamt";
        // main entries to the
        const tableEntries = entries.value.map(
            (
                entry: InvoiceEntry
            ): {
                [key: string]: string;
            } => {
                return {
                    [topicKey]: entry.topic,
                    [entryCostKey]: formatPrice(entry.price),
                    [entryAmountKey]: String(Math.round(entry.amount)),
                    [subtotalKey]: formatPrice(entry.price * entry.amount),
                };
            }
        );
        const skipEntry = {
            [topicKey]: "---------------------------------------------------------------",
            [entryCostKey]: "----------------",
            [entryAmountKey]: "----------------",
            [subtotalKey]: "----------------",
        };
        const subtotal = entries.value.reduce((acc: number, e: InvoiceEntry) => {
            return acc + e.price * e.amount;
        }, 0);
        const totalEntry = {
            [topicKey]: "Gesamtsumme",
            [entryCostKey]: "",
            [entryAmountKey]: "",
            [subtotalKey]: formatPrice(subtotal),
        };
        doc.table(
            PAGE_MARGIN,
            MAIN_BODY_START_Y + LINE_SKIP * 2.5,
            [...tableEntries, skipEntry, totalEntry],
            [topicKey, entryCostKey, entryAmountKey, subtotalKey],
            {
                autoSize: true,
                padding: 2,
            }
        );

        // lower description and hints
        const LOWER_LINE_SEPARATION = 30;
        doc.setFont(TEXT_FONT, "normal");
        if (isFinalStatement.value) {
            const payToExplanation = `Bitte begleichen Sie die Rechnung vollst. auf das Konto:`;
            doc.text(payToExplanation, PAGE_MARGIN, PAGE_HEIGHT - LOWER_LINE_SEPARATION - LINE_SKIP * 1.5, { align: "left" });
            doc.setFont(TEXT_FONT, "bold");
            doc.text(ownIBAN.value, PAGE_WIDTH - PAGE_MARGIN, PAGE_HEIGHT - LOWER_LINE_SEPARATION - LINE_SKIP * 1.5, {
                align: "right",
            });
            doc.setFont(TEXT_FONT, "normal");
        }
        doc.setFont(TEXT_FONT, "italic");
        doc.text("Nachfolgende Hinweise zur Beachtung:", PAGE_MARGIN, PAGE_HEIGHT - LOWER_LINE_SEPARATION - LINE_SKIP * 0.5, {
            align: "left",
        });
        doc.setFont(TEXT_FONT, "normal");
        doc.line(10, PAGE_HEIGHT - LOWER_LINE_SEPARATION, PAGE_WIDTH - 10, PAGE_HEIGHT - LOWER_LINE_SEPARATION);
        doc.text(
            "Die Rechnungsstellung kann aus rechtlichen Gründen aufgeteilt erfolgen.",
            PAGE_MARGIN,
            PAGE_HEIGHT - LOWER_LINE_SEPARATION + LINE_SKIP * 1.0,
            {
                align: "left",
            }
        );
        doc.text(
            "Diese Rechnung enthält keine Ausweisung der Umsatz-/Mehrwertsteuer aufgrund von Anwendung der Kleinunternehmer Regelung §19 UStG.",
            PAGE_MARGIN,
            PAGE_HEIGHT - LOWER_LINE_SEPARATION + LINE_SKIP * 2.0,
            {
                align: "left",
                maxWidth: PAGE_WIDTH - 2 * PAGE_MARGIN,
            }
        );

        // store/download file
        let filename;
        if (isFinalStatement.value) {
            filename = "invoice.pdf";
        } else {
            filename = "offer.pdf";
        }
        doc.save(filename);
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
