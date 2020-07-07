import { Component, OnInit } from '@angular/core';
import {Preset} from '../preset';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';;

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

  getItemUser = {username: ''};

  constructor(public ShopService: ShopService,
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
    this.getItemUser.username = localStorage.getItem('username').toString();
    console.log(this.getItemUser);
    this.ShopService.getItems(this.getItemUser)
        .subscribe(
            res => {
              this.ReceivedItems = <any>res;
              console.log(this.ReceivedItems);
            },
            err => console.log(err)
        )
  }

  buyPreset(preset) {
    this.presetArray.push(preset);
    localStorage.setItem('presetArray', JSON.stringify(this.presetArray));
  }

  buyItem(itemid) {

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