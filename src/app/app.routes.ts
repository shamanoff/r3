import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MembersComponent} from './members/members.component';
// import { AuthGuard } from './auth.service';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './shared/guard.service';
import {HomeComponent} from './home/home.component';
// import { EmailComponent } from './email/email.component';

export const router: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', redirectTo: ''},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  // { path: 'login-email', component: EmailComponent },
  // { path: 'members', component: MembersComponent }
  {path: 'members', component: MembersComponent, canActivate: [AuthGuard]}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
