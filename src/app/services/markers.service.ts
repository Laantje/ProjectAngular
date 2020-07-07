import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AgmMarker } from '@agm/core';

@Injectable()

export class MarkersService {

    private _markersUrl = 'http://localhost:3000/api/markers'

    constructor(private http: HttpClient,
        private _router: Router) {}

    postMarkers(AgmMarker){
        return this.http.post<any>(this._markersUrl, AgmMarker)
    }
    getMarkers(AgmMarker){
        return this.http.get<any>(this._markersUrl, AgmMarker)
    }
    putMarker(username) {
        return this.http.put<any>(this._markersUrl, username)
    }
}

