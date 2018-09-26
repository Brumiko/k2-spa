import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_utils/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { NewsComponent } from './news/news.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'naslovnica', component: HomeComponent },
  { path: 'novosti', component: NewsComponent},
  { path: 'prijava', component: LoginComponent },
  { path: 'registracija', component: RegisterComponent },
  /*{ path: 'profil', component: UserProfileComponent, canActivate: [AuthGuard] },*/

  { path: 'profil', redirectTo: 'profil/naslovnica' },
  { path: 'profil/naslovnica', component: UserProfileComponent, canActivate: [AuthGuard], data: { name: 'naslovnica' } }, 
  { path: 'profil/clanstvo', component: UserProfileComponent, canActivate: [AuthGuard], data: { name:'clanstvo' } },
  { path: 'profil/kontakti', component: UserProfileComponent, canActivate: [AuthGuard], data: { name: 'kontakti' } },
  { path: 'profil/radna-mjesta', component: UserProfileComponent, canActivate: [AuthGuard], data: { name: 'radna-mjesta' } },

  /*
  You can only return a real 404 from a http request 
  so the only way to return a 404 for a given route is 
  via server side rendering using universal.
  https://stackoverflow.com/questions/34227194/handling-404-with-angular2
  */
  { path: '**', redirectTo: 'naslovnica'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ], 
  exports: [ 
    RouterModule, 
  ]
})
export class AppRoutingModule { }
