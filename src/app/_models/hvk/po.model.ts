export class PO {
    id: number;
    vrsta?: string;
    vrsta_value?: string;
    oib: string;
    naziv: string;
    ziro?: string;

    constructor(
        id: number,
        naziv: string,
        oib: string,
        vrsta?: string,
        vrsta_value?: string,
        ziro?: string,
    ) {
        this.id = id;
        this.vrsta = vrsta;
        this.vrsta_value = vrsta_value;
        this.oib = oib;
        this.naziv = naziv;
        this.ziro = ziro;
    }
}