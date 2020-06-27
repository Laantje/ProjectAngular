import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private AuthenticationService: AuthenticationService,
    private _router: Router){}

    canActivate(): boolean {
        if(this.AuthenticationService.loggedIn()) {
            return true
        } else{
            this._router.navigate(['/login'])
            return false
        }
    }
}