import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {} from "googlemaps";
// import { AuthService } from "src/app/shared/auth.service";   ??????? do need
import { DataService } from "./../../data.service"; // connect to server
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;

  public zoom: number; //////////////
  public longitude: number;
  public latitude: number;
  public latLongs: any = []; //////////
  public latlong: any = {}; //////////
  public searchControl: FormControl;
  isSubmitted = true;

  personalInfoForm: FormGroup;
  //  //to choose game for event, later it will be from json file or db
  //  games = ['Uno', 'Merchant Cove', 'Pangea'];

  get firstName() {
    return this.personalInfoForm.get(["personal", "firstName"]);
  }

  get lastName() {
    return this.personalInfoForm.get(["personal", "lastName"]);
  }

  get phone() {
    return this.personalInfoForm.get(["personal", "phone"]);
  }

  get email() {
    return this.personalInfoForm.get(["personal", "email"]);
  }

  constructor(
    // private authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // ------new
    //
    // profile
    // const id = this.route.snapshot.params.id;
    // this.dataService.getProfile(id).subscribe((data) => this.profile = data);
    /// ----------new

    this.personalInfoForm = this.fb.group({
      id: [],
      personal: this.fb.group({
        photoUrl: "",
        name: "",
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phone: ["", Validators.required],
        email: ["", Validators.required],
        location: this.fb.group({
          address: "",
          geo: this.fb.group({
            longitude: [],
            latitude: [],
          }),
        }),
        dateOfBirth: "",
        description: "",
      }),
      events: this.fb.group({
        subscribed: [[]],
        interested: [[]],
        created: [[]],
      }),
      games: this.fb.group({
        favoreted: [[]],
        skillLevel: this.fb.group({
          novice: [[]],
          beginner: [[]],
          intermediate: [[]],
          advanced: [[]],
        }),
      }),
      rating: [],
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
          types: [],
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

  onSubmit() {
    console.log(this.personalInfoForm.value);
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
