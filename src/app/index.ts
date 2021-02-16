import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromUser from './reducers/users.reducer';
export interface State {
  users: fromUser.UsersState;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
export const getUsersState = createFeatureSelector<fromUser.UsersState>(
  'users'
);
export const getUsers = createSelector(getUsersState, fromUser.getUsers);
