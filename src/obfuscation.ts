const OBFUSCATION_KEY = 42; // Any number (should be consistent)
// the addresses and semi-personal default-data are obfuscated in the source to not get it web-scraped (easily)

export function obfuscate(text: string) {
    if (text == "") {
        return "";
    }

    return btoa([...text].map((c) => String.fromCharCode(c.charCodeAt(0) ^ OBFUSCATION_KEY)).join(""));
}

export function deobfuscate(encoded: string) {
    if (encoded == "") {
        return "";
    }

    return [...atob(encoded)].map((c) => String.fromCharCode(c.charCodeAt(0) ^ OBFUSCATION_KEY)).join("");
}

// Example Usage for the obfuscation (do not commit the "secret" things obviously)
const original = "testtesttest";
const obfuscated = obfuscate(original);
console.log(obfuscated);

export const STREET_OBVUSCATED = "eUlCS19dQ09ZWV5YBAobGA==";
export const CITY_OBVUSCATED = "EhwSGRoKeUlCXUtIR9ZESUJPRA==";

export const NAME1_OBVUSCATED = "YEVES1kKYU9GRg==";
export const NAME2_OBVUSCATED = "flhDWV5LRApvR0NN";
export const NAME3_OBVUSCATED = "a0ROWE9LWQpi3FpMT0Y=";

export const VAT_ID_NUMBER_OBVUSCATED = "GxoYBRscHgUfGhseHA==";

export const OWN_MAIL_OBVUSCATED = "SUVEXktJXmpAX1leB0NEB15DR08HS1lZRUlDS15DRUQETk8=";
export const SCHWABEN_MAIL_OBVUSCATED = "UE9DXkRLQkdPakhGXAdZSUJdS0hPRAROTw==";
