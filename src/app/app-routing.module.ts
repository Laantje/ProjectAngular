import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dialog } from './dialog/dialog';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  { path: 'dialog', component: Dialog },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'marketplace', component: MarketplaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
