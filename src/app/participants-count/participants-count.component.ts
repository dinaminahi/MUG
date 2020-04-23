import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ParticipantsCount } from './participants-count';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-participants-count',
  templateUrl: './participants-count.component.html',
  styleUrls: ['./participants-count.component.scss']
})
export class ParticipantsCountComponent implements OnChanges {
  @Input() count: ParticipantsCount;
  @Input() joined: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private _dataService: DataService
  ) {}

  ngOnChanges() {
    if (this.count && this.joined) {
      // console.log(this.count, this.joined);
      // normalize output if the count/joined test DB records contains issues
      if (this.count.current < 0) {
        this.count.current = 0;
      }
      if (this.count.current < this.joined.length) {
        this.count.current == this.joined.length;
      }
    }
  }

  onSelect(user) {
    this.router.navigate(['/useraccount', user._id]);
  }
}
