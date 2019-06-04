import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Login } from 'src/app/store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  errorMessage: string | null;
  getState$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState$
      .subscribe(
        state => {
          this.errorMessage = state.errorMessage;
        }
      );
  }

  onSubmit(): void {
    console.log('Logging user ->', this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
  }

}
