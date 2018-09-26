import { Alert } from "./alert.model";
import { AlertTypeEnum } from "./alert-type.enum";
import { ServerError } from "./server-error.model";

export class HttpAlert extends Alert {
    statusCode: number;
    statusText: string;
    url: string;
    details: ServerError[];

    constructor(
        type: AlertTypeEnum, 
        message: string, 
        statusCode: number, 
        statusText: string, 
        url: string, 
        details: ServerError[]) {
        super(type, message, true);
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.url = url;
        this.details = details;
    }
}