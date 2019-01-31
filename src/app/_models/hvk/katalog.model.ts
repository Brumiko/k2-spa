// Ključ-vrijednost klasa:
// - vrsta članstva
// - vrsta kontakta

export class Katalog {
    // Nazivi svojstava (properties) su KAO POLJA u WEB API-ju.
    ozn: string;
    naziv: string;

    constructor(ozn: string, naziv: string) {
        this.ozn = ozn;
        this.naziv = naziv;
    }
}