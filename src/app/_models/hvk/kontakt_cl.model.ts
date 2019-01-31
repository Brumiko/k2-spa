import { Link } from "./link.model";

export class KontaktCl {
    // Nazivi svojstava (properties) su KAO POLJA u WEB API-ju.
    id?: number;
    vrsta: string;
    vrsta_value?: string;
    sadrzaj: string;
    links?: Link[];

    constructor(
        vrsta: string, 
        sadrzaj: string, 
        id?: number, 
        vrsta_value?: string, 
        links?: Link[]
    ) {
        this.id = id;
        this.vrsta = vrsta;
        this.vrsta_value = vrsta_value;
        this.sadrzaj = sadrzaj;
        this.links = links;
    }
}