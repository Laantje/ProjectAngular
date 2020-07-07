import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable()

export class ShopService {

    private _itemsUrl = "http://localhost:3000/api/items";
    
    constructor(private http: HttpClient,
        private _router: Router) {
        
    }
    
    postItem(userNItem){
        return this.http.post<any>(this._itemsUrl, userNItem)
    }
    getItems(username){
        return this.http.get<any>(this._itemsUrl, username)
    }
}