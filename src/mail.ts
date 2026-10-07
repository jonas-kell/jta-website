const INVOICE_SUBJECT_TEMPLATE = "Rechnung für unseren Einsatz am {{ eventDay }}";

const INVOICE_BODY_TEMPLATE = [
    "Sehr geehrte Damen und Herren,",
    "",
    "anbei erhalten Sie die Rechnung für unsere Aufwände am {{ eventDay }} in {{ eventLocation }} ({{ eventName }}).",
    "",
    "Die beigefügte Leistungsübersicht des BLV dient der Information und enthält die Preise für die Anlagenmiete. Diese ist direkt an den BLV zu entrichten, eine Rechnung dafür erhalten Sie separat von diesem.",
    "",
    "Bitte begleichen Sie den gegen über uns ausstehenden Betrag zeitnah unter Angabe der",
    'Rechnungsnummer "{{ reNr }}".',
    "",
    "Bei Fragen zur Rechnung helfen wir gerne weiter.",
    "",
    "",
    "Sportliche Grüße,",
    "{{ writingPerson }} - Just in Time Association",
];

export function generateMailToLinkForInvoice(
    to_email: string,
    eventDay: string,
    eventLocation: string,
    eventName: string,
    reNr: string,
    writingPerson: string,
) {
    return assembleLink(
        [to_email],
        [],
        populateMailTemplate(
            INVOICE_SUBJECT_TEMPLATE,

            eventDay,
            eventLocation,
            eventName,
            reNr,
            writingPerson,
        ),
        populateMailTemplate(
            INVOICE_BODY_TEMPLATE.join("\n"),

            eventDay,
            eventLocation,
            eventName,
            reNr,
            writingPerson,
        ),
    );
}

export function makeMailsUnique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

function assembleLink(emails: string[], ccs: string[], subject: string, body: string): string {
    let cc = "";
    if (ccs.length > 0) {
        cc = "&cc=" + makeMailsUnique(ccs).map(encodeURIComponent).join(",");
    }

    return `mailto:${makeMailsUnique(emails).map(encodeURIComponent).join(",")}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}${cc}`;
}

function populateMailTemplate(
    template: string,
    eventDay: string,
    eventLocation: string,
    eventName: string,
    reNr: string,
    writingPerson: string,
): string {
    let interpolatedTemplate = template;

    // eventDay
    interpolatedTemplate = interpolatedTemplate.replaceAll("{{ eventDay }}", eventDay);

    // eventLocation
    interpolatedTemplate = interpolatedTemplate.replaceAll("{{ eventLocation }}", eventLocation);

    // eventName
    interpolatedTemplate = interpolatedTemplate.replaceAll("{{ eventName }}", eventName);

    // reNr
    interpolatedTemplate = interpolatedTemplate.replaceAll("{{ reNr }}", reNr);

    // writingPerson
    interpolatedTemplate = interpolatedTemplate.replaceAll("{{ writingPerson }}", writingPerson);

    return interpolatedTemplate;
}

// function stringList(inputs: string[]): string {
//     if (inputs.length > 1) {
//         return inputs.slice(0, -1).join(", ") + " und " + inputs.slice(-1);
//     } else {
//         return inputs[0] ?? "";
//     }
// }
