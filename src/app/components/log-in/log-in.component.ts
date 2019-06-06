import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import { Login } from 'src/app/store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromAuthReducer from '../../store/reducers/auth.reducers';
import * as fromAuthState from '../../store/app.states';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  authErrorMessage$: Observable<string>;

  constructor(
    private store: Store<fromAuthState.AppState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authErrorMessage$ = this.store.pipe(select(fromAuthState.selectAuthErrorMessage));
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
