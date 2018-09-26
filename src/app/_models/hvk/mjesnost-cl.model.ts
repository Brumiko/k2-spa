export class MjesnostCl {
    vrsta: string;
    vrsta_value: string;
    mjesto: string;
    mjesto_detail: string;
    adresa: string;

    constructor(
        placeTypeKey: string,
        placeTypeValue: string,
        locality: string,
        localityDetail: string,
        address: string
    ) {
        this.vrsta = placeTypeKey;
        this.vrsta_value = placeTypeValue;
        this.mjesto = locality;
        this.mjesto_detail = localityDetail;
        this.adresa = address;
    }
}