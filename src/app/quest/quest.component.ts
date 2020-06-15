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
  radius: number;
  label ?: string;
  titel ?: string;
  draggable: boolean;
  content ? : string;
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
  content : string
  private geoCoder;
  // Radius
  radius = 4000;
  radiusLat = 0;
  radiusLong = 0;

  markers: marker[] = []
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

  selectChangeHandler(event: any){
    //update the ui
    this.selectedValue = event.target.value
    var y: number = +this.selectedValue
    // this.radiusLat = this.selectedValue
    // this.radiusLong = this.selectedValue
    this.radius = y
    this.radiusDragEnd
    console.log(this.selectedValue)
    return(this.selectedValue)
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
    this.radius = $event;
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
