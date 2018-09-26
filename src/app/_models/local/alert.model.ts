import { AlertTypeEnum } from "./alert-type.enum";

export class Alert {
    type: AlertTypeEnum;
    message: string;
    isHttpAlert: boolean;

    constructor(type: AlertTypeEnum, message: string, isHttpAlert = false) {
        this.type = type;
        this.message = message;
        this.isHttpAlert = isHttpAlert;
    }
}