import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  MapsAPILoader,
  MouseEvent,
} from '@agm/core';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label ? : string;
  draggable: boolean;
  content ? : string;
  isShown: boolean;
  icon ? : string;
  alpha: number;
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
  private geoCoder;
  // Radius
  radius= 4000;
  radiusLat = 0;
  radiusLong = 0;

  markers: marker[] = []
  selectedMarker;

  addMarker(lat: number, lng: number) {
    this.markers.push({
      lat,
      lng,
      alpha: 1,
      isShown: true,
      draggable: false,
    });
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
      lng: event.longitude
    };
  }

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
        this.addMarker(this.latitude, this.longitude);

        for (let i = 1; i < this.markers.length; i++) {
          this.markers.push({
            lat: this.latitude + Math.random(),
            lng: this.longitude + Math.random(),
            label: `${i}`,
            draggable: false,
            alpha: 1,
            content: `Content no ${i}`,
            isShown: true,
            icon: './assets/marker-red.png'
          });
        }

      });
    }
  }

  selectChangeHandler(event: any){
    //update the ui
    this.selectedValue = event.target.value;
    this.radius = event.target.value
    return this.radius
    console.log(this.selectedValue)
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({
      'location': {
        lat: latitude,
        lng: longitude
      }
    }, (results, status) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  questMarker() {
    this.setCurrentLocation()
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
    this.radius = $event.radius;
  }

  showHideMarkers() {
    Object.values(this.markers).forEach(value => {
      value.isShown = this.getDistanceBetween(value.lat, value.lng, this.radiusLat, this.radiusLong);
    });
  }

  getDistanceBetween(lat1, long1, lat2, long2) {
    var from = new google.maps.LatLng(lat1, long1);
    var to = new google.maps.LatLng(lat2, long2);

    if (google.maps.geometry.spherical.computeDistanceBetween(from, to) <= this.radius) {
      console.log('Radius', this.radius);
      console.log('Distance Between', google.maps.geometry.spherical.computeDistanceBetween(
        from, to
      ));
      return true;
    } else {
      return false;
    }
  }

}
