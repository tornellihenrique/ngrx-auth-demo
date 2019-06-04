import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
    AuthActionTypes,
    Login, LoginSuccess, LoginFailure, Signup, SignupFailure, SignupSuccess
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    @Effect()
    login$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGIN),
            map((action: Login) => action.payload),
            switchMap(payload => {
                return this.authService.login(payload.email, payload.password)
                    .pipe(
                        map(user => {
                            console.log(user);
                            return new LoginSuccess({ token: user.token, email: payload.email });
                        }),
                        catchError(err => of(new LoginFailure({ err })))
                    );
            })
        );

    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGIN_SUCCESS),
            tap((user: any) => {
                localStorage.setItem('token', user.payload.token);
                this.router.navigateByUrl('/');
            })
        );

    @Effect()
    signup$: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.SIGNUP),
            map((action: Signup) => action.payload),
            switchMap(payload => {
                return this.authService.signup(payload.email, payload.password)
                    .pipe(
                        map(user => {
                            console.log(user);
                            return new SignupSuccess({ token: user.token, email: payload.email });
                        }),
                        catchError(err => of(new SignupFailure({ err })))
                    );
            })
        );

    @Effect({ dispatch: false })
    signupSuccess$: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.SIGNUP_SUCCESS),
            tap((user: any) => {
                localStorage.setItem('token', user.payload.token);
                this.router.navigateByUrl('/');
            })
        );

    @Effect({ dispatch: false })
    authFailure$: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGIN_FAILURE, AuthActionTypes.SIGNUP_FAILURE)
        );

    @Effect({ dispatch: false })
    public logout$: Observable<any> = this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGOUT),
            tap((user) => {
                localStorage.removeItem('token');
            })
        );
}
