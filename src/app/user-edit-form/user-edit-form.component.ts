import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../shared/auth.service";
import { DataService } from "./../data.service";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {} from "googlemaps";

import { UserItem } from "./../components/user-profile/user";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})

export class UserEditFormComponent implements OnInit {

  @ViewChild("search")
  public searchElementRef: ElementRef;


  currentUser: Object = {};
  expectedUser: UserItem;


  public zoom: number; //////////////
  public longitude: number;
  public latitude: number;
  public latLongs: any = []; //////////
  public latlong: any = {}; //////////
  public searchControl: FormControl;

  personalInfoForm: FormGroup;

  get username() {
    return this.personalInfoForm.get(["personal", "name"]);
  }

  get email() {
    return this.personalInfoForm.get(["personal", "email"]);
  }

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {

    let id = this.authService.UserId;

    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });

    this._dataService.getUserById(id).subscribe(res => {
      this.expectedUser = res[0];
    });

    this.personalInfoForm = this.fb.group({
      personal: this.fb.group({
        photoUrl: "",
        name: [""],
        firstName: [""],
        lastName: [""],
        phone: [""],
        email: [""],
        location: this.fb.group({
          address: "",
          geo: this.fb.group({
            longitude: [],
            latitude: [],
          }),
        }),
        dateOfBirth: "",
        description: [""]
      })
    });

    this.zoom = 8;
    this.latitude = 40.588;
    this.longitude = -88.89;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['(cities)'],
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const latlong = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };

          this.personalInfoForm.value.personal.location.geo.longitude =
            latlong.longitude;
          this.personalInfoForm.value.personal.location.geo.latitude =
            latlong.latitude;

          this.personalInfoForm.value.personal.location.address =
            place.formatted_address;

          this.latLongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
  }

  cancel() {
    this.router.navigate(['/user-profile', this.authService.UserId]);
  }

  onSubmit() {
    console.log(this.personalInfoForm.value);
    this._dataService.editUser(this.personalInfoForm.value, this.authService.UserId);
    this.router.navigate(['/user-profile', this.authService.UserId]);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }
}
