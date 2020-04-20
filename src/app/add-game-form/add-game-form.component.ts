import {
  Component,
  OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DataService } from "./../data.service";
import { AuthService } from "./../shared/auth.service";


@Component({
  selector: 'app-add-game-form',
  templateUrl: './add-game-form.component.html',
  styleUrls: ['./add-game-form.component.scss']
})

export class AddGameFormComponent implements OnInit {

  myForm: FormGroup;
  gameImages;
  loading: boolean;
  //to choose game for event, later it will be from json file or db
  // games = [];
  // get game() {
  //   return this.myForm.get('game');
  // } 

  get description() {
    return this.myForm.get("description");
  }

  // get address() {
  //   return this.myForm.get(["location", "address"]);
  // }

  // get dateTime() {
  //   return this.myForm.get("dateTime");
  // }

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: '',
      categories: [[]],
      description: ['', Validators.required],
      playersMinAge: [],
      playersCount: this.fb.group({
        min: [],
        max: [],
      }),
      playTimeMinutes: this.fb.group({
        min: [],
        max: [],
      }),
      instructionUrl: '',
      photoUrl: ['']
    });
  }

  selectMultipleImages(event) {
    if(event.target.files.length > 0) {
      this.gameImages = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    for (let img of this.gameImages) {
      formData.append('files', img);
    }
    formData.append('name', this.myForm.value.name);
    formData.append('description', this.myForm.value.description);
    formData.append('playersMinAge', this.myForm.value.playersMinAge);
    
    formData.append('playersCountMin', this.myForm.value.playersCount.min);
    formData.append('playersCountMax', this.myForm.value.playersCount.max);

    formData.append('timeMin', this.myForm.value.playTimeMinutes.min);
    formData.append('timeMax', this.myForm.value.playTimeMinutes.max);

    this.loading = true;
    // this._dataService.editUser(formData, this.authService.UserId)
    // .subscribe(editedUser => {
    //      console.log(editedUser);
    //      this.loading = false;
    //      this.router.navigate(['/user-profile', this.authService.UserId]);
    // });
    console.log(formData);
  }
}
