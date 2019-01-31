import { Link } from "./link.model";

export class RadnoMjesto {
    // Nazivi svojstava (properties) su KAO POLJA u WEB API-ju.
    id?: number;
    nkz: string;
    nkz_value?: string;
    po: number;
    po_detail?: string;
    dat_od: Date | string;
    dat_do?: Date | string;
    links?: Link[];

    constructor(
        nkz: string,
        po: number,
        dat_od: Date | string,
        id?: number,
        nkz_value?: string,
        po_detail?: string,
        dat_do?: Date | string,
        links?: Link[]
    ) {
        this.id = id;
        this.nkz = nkz;
        this.nkz_value = nkz_value;
        this.po = po;
        this.po_detail = po_detail;
        this.dat_od = dat_od;
        this.dat_do = dat_do;
        this.links = links;
    }
}