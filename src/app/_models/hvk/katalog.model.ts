// Ključ-vrijednost klasa:
// - vrsta članstva
// - vrsta kontakta

export class Katalog {
    ozn: string;
    naziv: string;

    constructor(ozn: string, naziv: string) {
        this.ozn = ozn;
        this.naziv = naziv;
    }
}