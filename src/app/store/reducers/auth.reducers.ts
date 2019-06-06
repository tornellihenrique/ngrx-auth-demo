import { User } from 'src/app/models/user.model';
import * as fromAuthActions from '../actions/auth.actions';


export interface State {
    isAuthenticated: boolean;
    user: User | null;
    authErrorMessage: string;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    authErrorMessage: null
};

export function reducer(
    state = initialState,
    action: fromAuthActions.AllAuthActionTypes
): State {
    switch (action.type) {
        case fromAuthActions.AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                authErrorMessage: null
            };
        }

        case fromAuthActions.AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                authErrorMessage: 'Wrong credentials!'
            };
        }

        default: {
            return state;
        }
    }
}
