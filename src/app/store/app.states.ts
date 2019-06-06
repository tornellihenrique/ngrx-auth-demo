
import { State } from './reducers/auth.reducers';
import { createSelector } from '@ngrx/store';

export interface AppState {
    auth: State;
}

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthErrorMessage = createSelector(
    selectAuth,
    (state: State) => state.authErrorMessage
);
