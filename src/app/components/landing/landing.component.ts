import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

}
