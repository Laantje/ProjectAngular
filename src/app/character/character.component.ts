import { Component, OnInit } from '@angular/core';
import {Preset} from '../preset';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PresetService } from '../services/preset.service';
import { ShopService } from '@app/services/shop.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  // ID's
  hairID = 0;
  skinID = 0;
  eyeID = 0;
  // Pictures
  hairSrc = 'assets/sprites/hair/hair0.png';
  skinSrc = 'assets/sprites/skin/skin0.png';
  eyeSrc = 'assets/sprites/eye/eye0.png';
  // Amount of possibilities
  availableHairs = [0];
  skinAmount = 5;
  eyeAmount = 5;

  hairCount = 0;

  name = '';
  presetAmmount = 0;

  getPresetUser = {username: ''}

  ReceivedPreset;
  ReceivedItems = [];
  presetArray = [];
  presetData = {username: '', skin: '', hair: '', eyes: ''}
  chararcterData = {skin: '', hair: '', eyes: ''}
  constructor(public PresetService: PresetService,
    public ShopService: ShopService,
    private httpservice: HttpClient,
    private _router: Router){}

  ngOnInit() {
    this.presetArray = JSON.parse(localStorage.getItem('presets'));
    
    //Get Preset
    this.getPresetUser.username = localStorage.getItem('username').toString()
    this.PresetService.putPreset(this.getPresetUser).subscribe(data =>
    {
      this.ReceivedPreset = <any>data;

      this.skinID = Number(this.ReceivedPreset[0].skin);
      this.hairID = Number(this.ReceivedPreset[0].hair);
      this.eyeID = Number(this.ReceivedPreset[0].eyes);
      
      this.updateSkin(this.skinID);
      this.updateHair(this.hairID);
      this.updateEye(this.eyeID);
    });
    this.ShopService.getItems(this.getPresetUser).subscribe(data =>
    {
      this.ReceivedItems = <any>data;
      
      if(this.ReceivedItems[0].itemid != "") {
        console.log("Works!");
        for(let i = 0; i<this.ReceivedItems.length; i++) {
            this.availableHairs.push(Number(this.ReceivedItems[i].itemid));
        }
      }
      
      this.hairCount = $.inArray( this.hairID, this.availableHairs );
    });
  }

  incrementSkin() {
    this.skinID ++;
    if (this.skinID === this.skinAmount){
      this.skinID = 0;
    }
    this.updateSkin(this.skinID);
  }

  decrementSkin() {
    if (this.skinID === 0){
      this.skinID = this.skinAmount;
    }
    this.skinID --;
    this.updateSkin(this.skinID);
  }

  incrementHair() {
    if (this.hairCount === this.availableHairs.length-1){
      this.hairCount = 0;
    }
    else {
      this.hairCount ++;
    }
    this.updateHair(this.availableHairs[this.hairCount]);
  }

  decrementHair() {
    if (this.hairCount === 0){
      this.hairCount = this.availableHairs.length-1;
    }
    else {
      this.hairCount--;
    }
    this.updateHair(this.availableHairs[this.hairCount]);
  }

  incrementEye() {
    this.eyeID ++;
    if (this.eyeID === this.eyeAmount){
      this.eyeID = 0;
    }
    this.updateEye(this.eyeID);
  }

  decrementEye() {
    if (this.eyeID === 0){
      this.eyeID = this.eyeAmount;
    }
    this.eyeID --;
    this.updateEye(this.eyeID);
  }

  updateHair(hairID) {
    switch (hairID) {
      case 0: {
        this.hairSrc = 'assets/sprites/hair/hair0.png';
        break;
      }
      case 1: {
        this.hairSrc = 'assets/sprites/hair/hair1.png';
        break;
      }
      case 2: {
        this.hairSrc = 'assets/sprites/hair/hair2.png';
        break;
      }
      case 3: {
        this.hairSrc = 'assets/sprites/hair/hair3.png';
        break;
      }
      case 4: {
        this.hairSrc = 'assets/sprites/hair/hair4.png';
        break;
      }
    }
  }

  updateSkin(skinID) {
    switch (skinID) {
      case 0: {
        this.skinSrc = 'assets/sprites/skin/skin0.png';
        break;
      }
      case 1: {
        this.skinSrc = 'assets/sprites/skin/skin1.png';
        break;
      }
      case 2: {
        this.skinSrc = 'assets/sprites/skin/skin2.png';
        break;
      }
      case 3: {
        this.skinSrc = 'assets/sprites/skin/skin3.png';
        break;
      }
      case 4: {
        this.skinSrc = 'assets/sprites/skin/skin4.png';
        break;
      }
    }
  }

  updateEye(eyeID) {
    switch (eyeID) {
      case 0: {
        this.eyeSrc = 'assets/sprites/eye/eye0.png';
        break;
      }
      case 1: {
        this.eyeSrc = 'assets/sprites/eye/eye1.png';
        break;
      }
      case 2: {
        this.eyeSrc = 'assets/sprites/eye/eye2.png';
        break;
      }
      case 3: {
        this.eyeSrc = 'assets/sprites/eye/eye3.png';
        break;
      }
      case 4: {
        this.eyeSrc = 'assets/sprites/eye/eye4.png';
        break;
      }
    }
  }

  savePreset() {
    this.presetData.username = localStorage.getItem('username').toString();
    this.presetData.skin = this.skinID.toString();
    this.presetData.hair = this.availableHairs[this.hairCount].toString();
    this.presetData.eyes = this.eyeID.toString();
    console.log(this.presetData);
    this.PresetService.postPreset(this.presetData).subscribe(
      res => {(res)
        
      },
      err => console.log(err)
    )
  }

  loadPreset(skin, hair, eyes) {
    this.skinID = skin;
    this.hairID = hair;
    this.eyeID = eyes;
    this.updateEye(eyes);
    this.updateHair(hair);
    this.updateSkin(skin);
  }

  deletePreset(index) {
    const del = 'del' + index;
    const set = 'set' + index;
    // document.getElementById(del).remove();
    // document.getElementById(set).remove();
    // delete this.presetArray[index];
    const aap = this.presetArray.splice(index, 1);
    localStorage.setItem('presetArray', JSON.stringify(this.presetArray));
  }

  saveCharacter(){
    const preset = new Preset(this.skinID, this.hairID, this.eyeID);
    localStorage.setItem('currentOutfit', JSON.stringify(preset));
    location.reload();
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
