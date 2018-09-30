import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';
import { Registration } from '../../_models/auth/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  constructor(private http: HttpClient) { }

  register(user: Registration) {
    return this.http.post(`${environment.REST_AUTH_URL}${conf.RA_REGISTER}`, user, conf.HTTP_OPTIONS_JSON);
  }
}