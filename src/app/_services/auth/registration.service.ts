import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Registration } from '../../_models/auth/registration.model';
import { conf } from '../../conf';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  constructor(private http: HttpClient) { }

  register(user: Registration) {
    return this.http.post(`${conf.REST_AUTH_URL}${conf.RA_REGISTER}`, user, conf.HTTP_OPTIONS_JSON);
  }
}