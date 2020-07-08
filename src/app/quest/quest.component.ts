import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  MapsAPILoader
} from '@agm/core';

import { Router } from '@angular/router';
import { MarkersService} from '../services/markers.service'
import { HttpClient} from '@angular/common/http';  
import { ResourceLoader } from '@angular/compiler';

// just an interface for type safety.

interface marker {
  lat: number;
  lng: number;
  radius: number;
  label ? : string;
  titel ? : string;
  draggable: boolean;
  content ? : string;
  isShown: boolean;
  icon ? : string;
}
interface questmarker {
  lat: number;
  lng: number;
  radius: number;
  label ? : string;
  titel ? : string;
  draggable: boolean;
  content ? : string;
  description: string;
  questname: string;
  isShown: boolean;
  icon ? : string;
}
@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})

export class QuestComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number = 11;
  address: string;
  selectedValue: number;
  content: string
  questname: string;
  description: string;
  newDescription:string;
  questExists:boolean = false;
  private geoCoder;
  // Radius
  radius = 12000;
  radiusLat = 0;
  radiusLong = 0;
  index;
  questmarker = {username: '', name: '', description: '', latitude: '', longitude: ''}
  list = []
  markers: marker[] = []
  Locationmarkers: questmarker[] = []
  ReceivedMarkers = []
  selectedMarker;


  addMarker(lat: number, lng: number, radius: number, content: string) {
    this.markers.push({
      lat,
      lng,
      radius,
      content,
      isShown: true,
      draggable: false,
    });
  }

  addQuestMarker(lat: number, lng: number, radius: number, questname: string, description: string) {
    this.Locationmarkers.push({
      lat,
      lng,
      radius,
      questname,
      description: description,
      isShown: true,
      draggable: false
    });
  }

  marker = this.Locationmarkers;
  
  removeQuestMarker() {
    let removeMarkerOfUser = {username: ''}
    removeMarkerOfUser.username = localStorage.getItem('username').toString();
    this.MarkersService.putMarker(removeMarkerOfUser)
    .subscribe(
        res => {(res)
        //this.http.put('username', removeMarkerOfUser)
        },
        err => console.log(err)
    )
    window.location.reload();
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitudem
    };
  }

  @ViewChild('myInput')
  public myInput: ElementRef;

  markerData: String[]
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private httpservice: HttpClient,
    public MarkersService: MarkersService,
    private http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit() {
    //load Places Autocomplete
    //load Map

      this.httpservice.get('http://localhost:3000/api/markers').subscribe(data =>
      {
        this.ReceivedMarkers = <any>data;

        this.mapsAPILoader.load().then(() => {
          this.geoCoder = new google.maps.Geocoder;
          
          if(!this.RefreshMarker()) {
            this.setCurrentLocation();
          }
        });
      });
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
        this.zoom = 11;
        this.content = "Your location"
        this.addMarker(this.latitude, this.longitude, this.radius, this.content);
      });
    }
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedValue = event.target.value
    var y: number = +this.selectedValue
    this.radius = y
    this.radiusDragEnd
    console.log(this.selectedValue)
    return (this.radius)
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  radiusDragEnd($event: any) {
    console.log($event);
    this.radiusLat = $event.coords.lat;
    this.radiusLong = $event.coords.lng;

  }

  event(type, $event) {
    console.log(type, $event);
    this.radius = $event;
  }

  // showHideMarkers() {
  //   Object.values(this.markers).forEach(value => {
  //     value.isShown = this.getDistanceBetween(value.lat, value.lng, this.radiusLat, this.radiusLong);
  //   });
  // }

  // getDistanceBetween(lat1, long1, lat2, long2) {
  //   var from = new google.maps.LatLng(lat1, long1);
  //   var to = new google.maps.LatLng(lat2, long2);

  //   if (google.maps.geometry.spherical.computeDistanceBetween(from, to) <= this.radius) {
  //     console.log('Radius', this.radius);
  //     console.log('Distance Between', google.maps.geometry.spherical.computeDistanceBetween(
  //       from, to
  //     ));
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getQuestDescription(refVar) {}

  getQuestName(refVar) {}

  //This function loads all open quests of user in the map
  RefreshMarker() {
    this.MarkersService.getMarkers(this.ReceivedMarkers) //<br/><br/><b>
        this.http.get('marker')
        var ownQuest = null;
        for(var i = 0; i < this.ReceivedMarkers.length; i++) {
          if(this.ReceivedMarkers[i].username == localStorage.getItem("username")) {
              ownQuest = {username: '', name: '', description: '', latitude: '', longitude: ''};
              ownQuest = this.ReceivedMarkers[i];
          }
        }
        if(ownQuest != null) {
            this.questmarker = ownQuest;
            //console.log(this.questmarker);
            this.newDescription = this.questmarker.description + "by user: " + this.questmarker.username + "</b>";
            //console.log(Number(this.questmarker.latitude));
            //console.log(Number(this.questmarker.longitude));
            this.latitude = Number(this.questmarker.latitude);
            this.longitude = Number(this.questmarker.longitude);
            this.addQuestMarker(Number(this.questmarker.latitude), Number(this.questmarker.longitude), 4000, this.questmarker.name, this.newDescription);
            this.questExists = true;
            this.zoom = 11;
            return true;
        }
        else {
          return false;
        }
  }

  postMarker() {
    this.MarkersService.postMarkers(this.questmarker) //<br/><br/><b>
    .subscribe(
        res => {(res)
        this.http.post('marker', res.marker)
        window.location.reload();
        },
        err => console.log(err)
    )
  }

  CurrentLocation(event) {
    if ('geolocation' in navigator && localStorage.getItem('username') != null) {
      navigator.geolocation.getCurrentPosition((position) => {
        Math.floor(Math.random() * (max - min + 1) + min);
        // var random: number = (Math.random() * (-0.3 + 0.3))
        if (this.radius == 4000) {
          var max: number = this.radius / 400000 * 3
          var min: number = max * -1
        }
        if (this.radius == 8000) {
          var max: number = this.radius / 400000 * 3
          var min: number = max - 2 * max
        }
        if (this.radius == 12000) {
          var max: number = this.radius / 400000 * 3
          var min: number = max - 2 * max
        }
        if (this.radius == 16000) {
          var max: number = this.radius / 400000 * 3
          var min: number = max - 2 * max
        }
        if (this.radius == 20000) {
          var max: number = this.radius / 400000 * 3
          var min: number = max - 2 * max
        }


        var lat3: number = (Math.random() * (max - min) + min);
        var long3: number = (Math.random() * (max - min) + min);
        var x: number = this.radius / 400000 * 3
        var z: number = this.radius / 400000 * 3

        this.latitude = position.coords.latitude + lat3;
        this.longitude = position.coords.longitude + long3;
        
        // console.log(min)
        // console.log(max)

        this.questmarker.latitude = this.latitude.toString()
        this.questmarker.longitude = this.longitude.toString()
        this.questmarker.username = localStorage.getItem('username').toString()

        this.zoom = 11;  
        
        //Send to db
        this.postMarker()
      });
    }
  }
}
