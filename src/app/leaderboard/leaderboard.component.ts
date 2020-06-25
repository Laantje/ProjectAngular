import { Component, OnInit } from '@angular/core';
import { user } from "../user";
import {Preset} from '../preset';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor() { }
  userArray = [];
  user1 = new user('Jan', 200, 300, new Preset(0,0,0))
  user2 = new user('Piet', 200, 550, new Preset(0,0,0))
  user3 = new user('Jorrit', 200, 700, new Preset(0,0,0))
  user4 = new user('David', 200, 699, new Preset(0,0,0))
  user5 = new user('Sebastiaan',500, 988, new Preset(0,0,0))

  ngOnInit() {
    this.userArray = JSON.parse(localStorage.getItem('userArray'));
    /*this.userArray.push(this.user1);
    this.userArray.push(this.user2);
    this.userArray.push(this.user3);
    this.userArray.push(this.user4);
    this.userArray.push(this.user5);*/
    this.userArray.sort((a, b) => b.points - (a.points));
    localStorage.setItem('userArray', JSON.stringify(this.userArray));
  }

}
