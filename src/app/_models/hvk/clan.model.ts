import { Link } from "./link.model";

export class Clan {
    // Nazivi svojstava (properties) su KAO POLJA u WEB API-ju.
    py_user: string;
    oib: string;
    spol: string;
    dat_rod: Date;
    slika: string;
    ime: string;
    prezime: string;
    aktivno_clanstvo: boolean;
    email: string;
    links: Link[];

    constructor(
        username: string,
        oib: string,
        sex: string,
        dob: Date,
        portrait: string,
        name: string,
        surname: string,
        activeMembership: boolean,
        email: string,
        links: Link[]
    ) {
        this.py_user = username;
        this.oib = oib;
        this.spol = sex;
        this.dat_rod = dob;
        this.slika = portrait;
        this.ime = name;
        this.prezime = surname;
        this.aktivno_clanstvo = activeMembership;
        this.email = email;
        this.links = links;
    }
}