import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    loginUserData = {username: '', password: ''}
    constructor(private AuthenticationService: AuthenticationService,
        private _router: Router){}

    ngOnInit(): void {
    }

    loginUser() {
        this.AuthenticationService.loginUser(this.loginUserData)
        .subscribe(
            res => {console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/home'])
            },
            err => console.log(err)
        )
    }
}