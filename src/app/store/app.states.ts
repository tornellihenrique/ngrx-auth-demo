import * as fromAuthReducers from './reducers/auth.reducers';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    authState: fromAuthReducers.State;
}

export const reducers = {
    auth: fromAuthReducers.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
