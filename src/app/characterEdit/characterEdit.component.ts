import { Component, OnInit } from '@angular/core';
import {Preset} from '../preset';
import {DatabaseService} from '../database.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-characterEdit',
  templateUrl: './characterEdit.component.html',
  styleUrls: ['./characterEdit.component.css']
})
export class CharacterEditComponent implements OnInit {

  // ID's
  hairID = 0;
  skinID = 0;
  eyeID = 0;
  // Pictures
  hairSrc = 'assets/sprites/hair/hair0.png';
  skinSrc = 'assets/sprites/skin/skin0.png';
  eyeSrc = 'assets/sprites/eye/eye0.png';
  // Amount of possibilities
  hairAmount = 5;
  skinAmount = 5;
  eyeAmount = 5;

  name = '';
  presetAmmount = 0;

  presetArray = [];
  constructor(
    public dialogRef: MatDialogRef<CharacterEditComponent>,
    private data: DatabaseService) { }

  ngOnInit() {
    this.presetArray = JSON.parse(localStorage.getItem('presetArray'));
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
    this.hairID ++;
    if (this.hairID === this.hairAmount){
      this.hairID = 0;
    }
    this.updateHair(this.hairID);
  }

  decrementHair() {
    if (this.hairID === 0){
      this.hairID = this.hairAmount;
    }
    this.hairID --;
    this.updateHair(this.hairID);
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

  savePreset(name) {
    if (name === '') {
      name = 'Preset ' + this.presetAmmount;
    }
    this.presetAmmount++;
    const preset = new Preset(this.skinID, this.hairID, this.eyeID);
    this.presetArray.push(preset);
    localStorage.setItem('presetArray', JSON.stringify(this.presetArray));
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
