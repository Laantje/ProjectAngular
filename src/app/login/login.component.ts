import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserData = {username: '', password: ''}
    constructor(public AuthenticationService: AuthenticationService,
        private _router: Router){}

    ngOnInit(): void {
    }

    loginUser() {
        this.AuthenticationService.loginUser(this.loginUserData)
        .subscribe(
            res => {(res)
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', this.loginUserData.username)
            this._router.navigate(['/home'])
            },
            err => console.log(err)
        )
    }
}