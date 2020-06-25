import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dialog } from './dialog/dialog';
import { CharacterEditComponent } from './characterEdit/characterEdit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './ng-material.module';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

@NgModule({
  declarations: [
    AppComponent,
    Dialog,
    CharacterEditComponent,
    HeaderComponent,
    LeaderboardComponent,
    AdminPanelComponent,
    MarketplaceComponent,
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CharacterEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
