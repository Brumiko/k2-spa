import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    private subject = new Subject<any>();

    constructor() { }

    sendMessage(message: any) {
        this.subject.next({ message: message});
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
