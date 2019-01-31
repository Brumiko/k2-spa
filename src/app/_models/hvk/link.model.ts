export class Link {
    // Nazivi svojstava (properties) su KAO POLJA u WEB API-ju.
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}