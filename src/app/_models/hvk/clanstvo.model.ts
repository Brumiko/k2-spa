export class Clanstvo {
    vrsta_clanstva: string;
    vrsta_clanstva_value: string;
    dat_od: Date;
    dat_do: Date;
    prestanak_cl: string;
    prestanak_cl_value: string;

    constructor(
        membershipTypeKey: string,
        membershipTypeValue: string,
        startDate: Date,
        endDate: Date,
        cessationReasonKey: string,
        cessationReasonValue: string
    ) {
        this.vrsta_clanstva = membershipTypeKey;
        this.vrsta_clanstva_value = membershipTypeValue;
        this.dat_od = startDate;
        this.dat_do = endDate;
        this.prestanak_cl = cessationReasonKey;
        this.prestanak_cl_value = cessationReasonValue;
    }
}