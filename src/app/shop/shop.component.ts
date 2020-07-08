import { Component, OnInit } from '@angular/core';
import {Preset} from '../preset';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { HttpClient } from '@angular/common/http';
import { user } from '@app/user';
;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  presetArray = [];
  verkoopArray = [];
  empty = [];
  ReceivedItems = [];
  itemCosts = [50, 250, 75, 50];
  itemExists = [false, false, false, false];
  userPoints = 0;

  getItemUser = {username: ''}
  buyItemBody = {username: '', itemid: ''}

  constructor(public ShopService: ShopService,
    private httpservice: HttpClient,
    private _router: Router) { }

  ngOnInit() {
    // localStorage.setItem('presetArray', JSON.stringify(this.empty));
    // localStorage.setItem('verkoopArray', JSON.stringify(this.empty));

    this.presetArray = JSON.parse(localStorage.getItem('presetArray'));
    let temp = JSON.parse(localStorage.getItem('verkoopArray'));
    if (temp === null) {
      temp = [];
    }
    const hair1 = new Preset(0, 1, 0);
    const hair2 = new Preset(0, 2, 0);
    const hair3 = new Preset(0, 3, 0);
    const hair4 = new Preset(0, 4, 0);
    this.verkoopArray.push(hair1, hair2, hair3, hair4);
    this.verkoopArray = [ ...this.verkoopArray, ...temp];

    //Get items!
    /*this.httpservice.get('http://localhost:3000/api/items').subscribe(data =>
    {
      this.ReceivedItems = <any>data;

      this.SetButtons();
    });*/
    this.getItemUser.username = localStorage.getItem('username').toString()
    this.ShopService.getItems(this.getItemUser).subscribe(data =>
    {
      this.ReceivedItems = <any>data;
      
      console.log(this.ReceivedItems)
      this.userPoints = Number(this.ReceivedItems[0].points);

      this.SetButtons();
    });
  }

  SetButtons() {
    for(var b = 0; b < this.ReceivedItems.length; b++) {
      switch((this.ReceivedItems[b].itemid-1)) {
        case 0: 
          this.itemExists[0] = true;
          break;
        case 1: 
          this.itemExists[1] = true;
          break;
        case 2: 
          this.itemExists[2] = true;
          break;
        case 3: 
          this.itemExists[3] = true;
          break;
      }
    }
  }

  buyPreset(preset) {
    this.presetArray.push(preset);
    localStorage.setItem('presetArray', JSON.stringify(this.presetArray));
  }

  buyItem(itemid) {
      if(this.userPoints >= this.itemCosts[itemid]){ 
        this.buyItemBody.username = localStorage.getItem('username').toString()
        this.buyItemBody.itemid = itemid+1;
        this.ShopService.postItem(this.buyItemBody).subscribe(
          res => {(res)
            
          },
          err => console.log(err)
        )
        window.location.reload();
      }
  }

  hairToSrc(id) {
    return('assets/sprites/hair/hair' + id + '.png');
  }

  skinToSrc(id) {
    return('assets/sprites/skin/skin' + id + '.png');
  }

  eyesToSrc(id) {
    return('assets/sprites/eye/eye' + id + '.png');
  }
}