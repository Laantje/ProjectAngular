import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable()

export class PresetService {

    private _presetUrl = "http://localhost:3000/api/preset";
    
    constructor(private http: HttpClient,
        private _router: Router) {
        
    }
    
    postPreset(userNPreset){
        return this.http.post<any>(this._presetUrl, userNPreset)
    }
    putPreset(username){
        return this.http.put<any>(this._presetUrl, username)
    }
}