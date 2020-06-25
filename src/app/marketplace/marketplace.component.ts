import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
import {Preset} from '../preset';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  presetArray = [];
  verkoopArray = [];
  empty = [];

  constructor(private data: DatabaseService) { }

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
  }

  buyPreset(preset) {
    this.presetArray.push(preset);
    localStorage.setItem('presetArray', JSON.stringify(this.presetArray));
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
