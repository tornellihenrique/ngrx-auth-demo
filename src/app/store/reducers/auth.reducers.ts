import { User } from 'src/app/models/user.model';
import { AllAuthActionTypes, AuthActionTypes } from '../actions/auth.actions';


export interface State {

    // Usuário está autenticado?
    isAuthenticated: boolean;

    // Se autenticado, deve haver um objeto usuário
    user: User | null;

    // Mensagem de erro
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: AllAuthActionTypes): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }

        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }

        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }

        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'That email is already in use.'
            };
        }

        case AuthActionTypes.LOGOUT: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
