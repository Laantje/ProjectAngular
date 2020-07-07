import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule} from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { Dialog } from './dialog/dialog';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuestComponent } from './quest/quest.component';
import { ServiceWorkerModule } from  '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { CharacterComponent } from './character/character.component';
import { ShopComponent } from './shop/shop.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthenticationService} from './services/authentication.service'
import { PointsService} from './services/points.service'
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkersService } from './services/markers.service';
import {MatDialogRef} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    Dialog,
    WelcomeComponent,
    LoginComponent,
    HomeComponent,
    QuestComponent,
    LeaderboardsComponent,
    CharacterComponent,
    ShopComponent,
    RegisterComponent,

  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAYUmxWepc6p4b076XMOvvn6ruY_5Zf8Ms',
      libraries: ["places"]
    }),
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production }),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, AuthGuard, PointsService, MarkersService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: MatDialogRef, useValue: {} },



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
