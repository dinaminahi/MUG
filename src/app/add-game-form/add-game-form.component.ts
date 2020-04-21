import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { Router } from "@angular/router";

import { DataService } from "./../data.service";
import { AuthService } from "./../shared/auth.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: "app-add-game-form",
  templateUrl: "./add-game-form.component.html",
  styleUrls: ["./add-game-form.component.scss"],
})
export class AddGameFormComponent implements OnInit {
  myForm: FormGroup;
  gameImages;
  loading: boolean;
  categoriesNames = [];

  get description() {
    return this.myForm.get("description");
  }

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._dataService.getCategories().subscribe((categories) => {
      categories.forEach((category) =>
        this.categoriesNames.push(category.name)
      );
      console.log(this.categoriesNames);
    });

    this.myForm = this.fb.group({
      name: "",
      categories: this.fb.array([this.fb.control("")]),
      description: ["", Validators.required],
      playersMinAge: [],
      playersCount: this.fb.group({
        min: [],
        max: [],
      }),
      playTimeMinutes: this.fb.group({
        min: [],
        max: [],
      }),
      instructionUrl: "",
      photoUrl: [""],
    });
  }

  selectMultipleImages(event) {
    if (event.target.files.length > 0) {
      this.gameImages = event.target.files;
    }
  }

  get categories() {
    return this.myForm.get("categories") as FormArray;
  }

  addOneMoreCategory() {
    this.categories.push(this.fb.control(""));
  }

  onSubmit() {
    // console.log(this.myForm.get(["categories"]).value);
    const formData = new FormData();
    for (let img of this.gameImages) {
      formData.append("photos", img);
    }
    for (let category of this.myForm.get(["categories"]).value) {
      formData.append("categoryNames", category);
    }
    formData.append("name", this.myForm.value.name);
    formData.append("description", this.myForm.value.description);
    formData.append("playersMinAge", this.myForm.value.playersMinAge);
    formData.append("instructionUrl", this.myForm.value.instructionUrl);
    formData.append("playersCountMin", this.myForm.value.playersCount.min);
    formData.append("playersCountMax", this.myForm.value.playersCount.max);

    formData.append("timeMin", this.myForm.value.playTimeMinutes.min);
    formData.append("timeMax", this.myForm.value.playTimeMinutes.max);

    this.loading = true;
    this._dataService.addGame(formData).subscribe((addedGame) => {
      console.log(addedGame);
      this.loading = false;
      this.router.navigate(["/games"]);
    });
  }
}
