import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestComponent } from './quest/quest.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [ 
    { path: '', component: WelcomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'quest', component: QuestComponent, canActivate: [AuthGuard]},

    // otherwise redirect to welcome
    { path: '**', redirectTo: ' ' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
