import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import { Signup } from 'src/app/store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log('Signingup user ->', this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Signup(payload));
  }

}
