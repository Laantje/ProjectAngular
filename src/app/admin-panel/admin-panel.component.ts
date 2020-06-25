import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  userArray = JSON.parse(localStorage.getItem('userArray'));
  constructor() { }

  ngOnInit() {

  }

  addPoints(name, value){
    let user = this.userArray.find(x => x.name === name);
    this.removeUser(user);
    user.points = parseInt(user.points) + parseInt(value);
    this.userArray.push(user);
    localStorage.setItem('userArray', JSON.stringify(this.userArray));
  }

  removeUser(user){
    this.userArray = this.userArray.filter(obj => obj !== user);
  }

}
