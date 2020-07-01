import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable()

export class PointsService {

    private _leaderBordUrl = "http://localhost:3000/api/leaderboard";
    


    constructor(private http: HttpClient,
        private _router: Router) {
        
    }
    leaderBord(user){
        return this.http.get<any>(this._leaderBordUrl, user)
    }
   
}