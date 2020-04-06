import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Validators} from "@angular/forms"
import { MapsAPILoader } from '@agm/core';
import { DataService } from "../../data.service";

import { } from "googlemaps";

@Component({
  selector: "app-page-add-event",
  templateUrl: "./page-add-event.component.html",
  styleUrls: ["./page-add-event.component.scss"]
})

export class PageAddEventComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;

  public zoom: number; //////////////
  public longitude: number;
  public latitude: number;
  public latLongs: any = []; //////////
  public latlong: any = {}; //////////
  public searchControl: FormControl;
  isSubmitted = true;

   public eventsCount: number;
  
  myForm: FormGroup;
  //to choose game for event, later it will be from json file or db
  games = ["Uno", "Merchant Cove", "Pangea"];

  get gameA() {
    return this.myForm.get('gameA');
  } 

  get description() {
    return this.myForm.get("description");
  }

  get address() {
    return this.myForm.get(["location", "address"]);
  }

  get dateTime() {
    return this.myForm.get("dateTime");
  }

  constructor(private fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _dataService: DataService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [],
      eventName: [''],
      gameId: 3,
      gameA: ['', Validators.required],
      dateTime: ['', Validators.required],
      duration: [''],
      location: this.fb.group({
        address: ["", Validators.required],
        geo: this.fb.group({
          latitude: [],
          longitude:  []
        })
      }),
      description: ["", Validators.required],
      players: this.fb.group({
       age: this.fb.group({
         min: [],
         max: []
       }),
       count: this.fb.group({
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
    this.longitude = -88.89;

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
          this._dataService.getEvents().subscribe(res => {
            this.eventsCount = res.length;
          }); 
         });
      });
    });
  }

  onSubmit() {
    this.myForm.value.id = this.eventsCount++;
    this._dataService.addEvent(this.myForm.value);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }
}
