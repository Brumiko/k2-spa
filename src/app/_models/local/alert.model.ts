import { AlertTypeEnum } from "./alert-type.enum";

/**
 * Klasa koja predstavlja upozorenje.
 */
export class Alert {
    type: AlertTypeEnum;
    message: string;
    isHttpAlert: boolean;

    /**
     * Konstruktor upozorenja.
     * @param type Vrsta upozorenja.
     * @param message Tekstualna poruka za prikaz korisniku.
     * @param isHttpAlert True ako je upozorenje došlo sa servera (web-API-ja),
     * inače false (ako je došlo lokalno, iz Angulara).
     */
    constructor(type: AlertTypeEnum, message: string, isHttpAlert = false) {
        this.type = type;
        this.message = message;
        this.isHttpAlert = isHttpAlert;
    }
}