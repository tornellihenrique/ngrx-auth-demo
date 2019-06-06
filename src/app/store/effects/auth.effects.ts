import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as fromAuthActions from '../actions/auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from 'src/app/store/actions/auth.actions';


@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.action$
        .pipe(
            ofType(fromAuthActions.AuthActionTypes.LOGIN),
            map((action: Login) => action.payload),
            mergeMap((user: User) => this.authService.login(user.email, user.password)
                .pipe(
                    map(() => new fromAuthActions.LoginSuccess({ user: user.email })),
                    catchError(err => of(new fromAuthActions.LoginFailure({})))
                ))
        );

    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.action$
        .pipe(
            ofType(fromAuthActions.AuthActionTypes.LOGIN_SUCCESS),
            tap((user: any) => {
                localStorage.setItem('token', user.payload.token);
                this.router.navigateByUrl('/');
            })
        );

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}
