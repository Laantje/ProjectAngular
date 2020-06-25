import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterEditComponent } from '../characterEdit/characterEdit.component';
import { user } from "../user";
import { Preset } from "../preset";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css']
})
export class Dialog implements OnInit {
  /*create test user*/
  outfit = JSON.parse(localStorage.getItem('currentOutfit'));
  user1 = new user('Sebastiaan',500, 988, this.outfit);



  /*load current appearance*/
  hairSrc = this.hairToSrc(this.user1.preset.hair);
  skinSrc = this.skinToSrc(this.user1.preset.skin);
  eyeSrc = this.eyesToSrc(this.user1.preset.eyes);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    let userArray = JSON.parse(localStorage.getItem('userArray'));
    let usercopy = userArray.find(x => x.name === 'Sebastiaan');
    this.user1.points = usercopy.points;
  }

  showDialog() {
    const dialogRef = this.dialog.open(CharacterEditComponent, {
      width: '800px'
    });
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
  update(){
    this.outfit = JSON.parse(localStorage.getItem('currentOutfit'));
    this.user1 = new user('Sebastiaan',500, 98834, this.outfit);
  }
}
