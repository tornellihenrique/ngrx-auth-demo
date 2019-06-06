import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',

    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure',

    LOGOUT = '[Auth] Logout',
}

// Login

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: User) { }
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

// Signup

export class Signup implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: User) { }
}

export class SignupSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: any) { }
}

export class SignupFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) { }
}

// Logout

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AllAuthActionTypes =
    | Login
    | LoginSuccess
    | LoginFailure
    | Signup
    | SignupSuccess
    | SignupFailure
    | Logout;
