import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
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
   isSubmitted = true;

  myForm: FormGroup;
  //to choose game for event, later it will be from json file or db
  games = ['Uno', 'Merchant Cove', 'Pangea'];

  get game() {
    return this.myForm.get('game');
  } 

  get description() {
    return this.myForm.get('description');
  } 

  get address() {
    return this.myForm.get(['location', 'address']);
  } 

  get dateTime() {
    return this.myForm.get('dateTime');
  } 

  constructor(private fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      eventName: [''],
      game: ['', Validators.required],
      dateTime: ['', Validators.required],
      duration: [''],
      location: this.fb.group({
        address: ['', Validators.required],
        geo: this.fb.group({
          longitude:  [],
          latitude: []
        })
       }),
      description: ['', Validators.required],
      players: this.fb.group({
       age: this.fb.group({
         min: [],
         max: []
       }),
       amount: this.fb.group({
         min: [],
         max: []
       }),
       current: 0,
       following: [[]],
       experiance: ['new']
      })
    });


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

          this.myForm.value.location.geo.longitude = latlong.longitude;
          this.myForm.value.location.geo.latitude = latlong.latitude;

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
