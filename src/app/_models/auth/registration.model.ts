export class Registration {
    // Nazivi svojstava su KAO POLJA u WEB API-ju.
    username: string;
    email: string;
    password1: string;
    password2: string;
    ime: string;
    prezime: string;
    oib: string;
    vrsta_clanstva: string;
    //slika: File;

    constructor(
        username: string,
        email: string,
        password1: string,
        password2: string,
        name: string,
        surname: string,
        id: string,
        membershipType: string/*,
        slika: File*/
    ) { 
        this.username = username;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
        this.ime = name;
        this.prezime = surname;
        this.oib = id;
        this.vrsta_clanstva = membershipType;
        //this.slika = slika;
    }
}