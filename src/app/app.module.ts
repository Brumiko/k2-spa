import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbTypeaheadConfig, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AlertComponent } from './_lego/alert/alert.component';
import { AlertService } from './_services/local/alert.service';
import { AuthenticationService } from './_services/auth/authentication.service';
import { AuthGuard } from './_utils/auth.guard';
import { ErrorInterceptor } from './_utils/error.interceptor';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './_utils/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './_lego/navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationService } from './_services/auth/registration.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VrstaClanstvaComponent } from './_lego/vrsta-clanstva/vrsta-clanstva.component';
import { VrstaKontaktaComponent } from './_lego/vrsta-kontakta/vrsta-kontakta.component';
import { NkzAutocompleteComponent } from './_lego/nkz-autocomplete/nkz-autocomplete.component';
import { PoAutocompleteComponent } from './_lego/po-autocomplete/po-autocomplete.component';
import { ProfilOsnovnoComponent } from './_lego/profil-osnovno/profil-osnovno.component';
import { ProfilClanstvoComponent } from './_lego/profil-clanstvo/profil-clanstvo.component';
import { ProfilKontaktiComponent } from './_lego/profil-kontakti/profil-kontakti.component';
import { ProfilRadMjeComponent } from './_lego/profil-rad-mje/profil-rad-mje.component';
import { RadMjeModalComponent } from './_lego/rad-mje-modal/rad-mje-modal.component';

@NgModule({
  declarations: [
    AppComponent,

    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    VrstaClanstvaComponent,
    NewsComponent,
    NavbarComponent,
    VrstaKontaktaComponent,
    NkzAutocompleteComponent,
    PoAutocompleteComponent,
    ProfilOsnovnoComponent,
    ProfilClanstvoComponent,
    ProfilKontaktiComponent,
    ProfilRadMjeComponent,
    RadMjeModalComponent,
  ],
  entryComponents: [
      RadMjeModalComponent,
  ],
  imports: [
    BrowserModule,

    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    NgbTypeaheadConfig,
    RegistrationService,
    //{ provide: LOCALE_ID, useValue: 'hr' }, // Ovo sjebava SVE!?!
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }