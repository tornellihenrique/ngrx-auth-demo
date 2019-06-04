import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Signup } from 'src/app/store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  errorMessage: string | null;
  getState$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState$
      .subscribe(
        state => {
          this.errorMessage = state.errorMessage;
        }
      );
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
