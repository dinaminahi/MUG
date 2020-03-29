import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { EventItem } from '../../event-item/event-item';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Validators} from "@angular/forms"
import { MapsAPILoader } from '@agm/core';
import { } from "googlemaps";


@Component({
  selector: 'app-page-add-event',
  templateUrl: './page-add-event.component.html',
  styleUrls: ['./page-add-event.component.scss']
})
export class PageAddEventComponent implements OnInit {

   @ViewChild('search')
   public searchElementRef: ElementRef;

   public zoom: number;  //////////////
   public longitude: number;
   public latitude: number;
   public latLongs: any = []; //////////
   public latlong: any = {}; //////////
   public searchControl: FormControl;


  myForm: FormGroup;
  //to choose game for event, later it will be from json file or db
  games = ['Uno', 'Merchant Cove', 'Pangea'];

  constructor(private fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { 
      
    this.myForm = this.fb.group({
      eventName: ['', Validators.required],
      game: '',
      dateTime: '',
      duration: '',
      location: this.fb.group({
        address: '',
        longitude:  [],
        latitude: []
     }),
      description: '',
      players: this.fb.group({
       age: this.fb.group({
         min: [],
         max: []
       }),
       amount: this.fb.group({
         min: [],
         max: []
       }),
       current: [],
       experiance: ''
      })
    });
  }


  ngOnInit(): void {
    this.zoom = 8;
    this.latitude = 40.588;
    this.longitude = -88.890;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then( () => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
         this.ngZone.run( () => {
           const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if ( place.geometry === undefined || place.geometry === null ) {
            return ;
          }

          const latlong = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };

          this.myForm.value.location.longitude = latlong.longitude;
          this.myForm.value.location.latitude = latlong.latitude;

          this.myForm.value.location.address = place.formatted_address;

          this.latLongs.push(latlong);
          this.searchControl.reset();
         });
      });
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  private setCurrentPosition() {
    if( 'geolocation' in navigator ) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      })
    }
  }
}
