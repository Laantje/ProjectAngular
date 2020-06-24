import { Component, Input } from '@angular/core';


import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Walkapp';
  constructor(
     public _authService: AuthenticationService) {}
 
}