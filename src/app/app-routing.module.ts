import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestComponent } from './quest/quest.component';
import { ShopComponent } from './shop/shop.component';
import { CharacterComponent } from './character/character.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'leaderboards', component: LeaderboardsComponent, canActivate: [AuthGuard]},
    { path: 'character', component: CharacterComponent, canActivate: [AuthGuard]},
    { path: 'quest', component: QuestComponent, canActivate: [AuthGuard]},
    { path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},

    // otherwise redirect to welcome
    { path: '**', redirectTo: ' ' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
