import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import {
  MapsAPILoader
} from '@agm/core';
import { __values } from 'tslib';

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
  zoom: number;
  address: string;
  selectedValue: number;
  content: string
  questname: string;
  description: string;
  private geoCoder;
  // Radius
  radius = 4000;
  radiusLat = 0;
  radiusLong = 0;
  index;

  list = []
  markers: marker[] = []
  Locationmarkers: questmarker[] = []
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
      description,
      isShown: true,
      draggable: false,
    });
  }

  removeQuestMarker(index: number) {
    for (var i = 0; i < this.Locationmarkers.length; i ++ ){
      if (i == index){
        this.Locationmarkers.splice(index, 1)
      }
    }
    console.log(index)
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

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    //load Places Autocomplete
    //load Map
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
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


  CurrentLocation(event, index) {
    if ('geolocation' in navigator) {
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

        this.latitude = position.coords.latitude + lat3
        this.longitude = position.coords.longitude + long3
        this.zoom = 11;
        // console.log(min)
        // console.log(max)
        this.addQuestMarker(this.latitude, this.longitude, this.radius, this.questname, this.description);
      });
    }
  }
}
