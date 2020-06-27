import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {username: '', password: ''}
  constructor(public AuthenticationService: AuthenticationService,
    private _router: Router) {
     }

  ngOnInit() {
  }

  registerUser(){
   this.AuthenticationService.registerUser(this.registerUserData)
   .subscribe(
     res => {(res)
     localStorage.setItem('token', res.token)
     this._router.navigate(['/login'])
     },
     err => console.log(err)
   )
  }
}
