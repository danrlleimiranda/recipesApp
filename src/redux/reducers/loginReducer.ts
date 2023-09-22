import { ActionType } from '../../types';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export function loginReducer(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      return {
        user: action.payload,
      };
    default:
      return state;
  }
}
