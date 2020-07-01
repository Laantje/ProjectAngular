import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointsService} from '../services/points.service'
import { HttpClient} from '@angular/common/http';  


@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {


  constructor(public PointsService: PointsService, 
    private httpservice: HttpClient,
    private _router: Router) { }

    pointsUserData: String[]
  ngOnInit(){
    this.httpservice.get('http://localhost:3000/api/leaderboard').subscribe(data =>
    {
      this.pointsUserData = data as string[];
    });
  }
}
