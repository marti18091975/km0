import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models/user.model';

import {
  get_users,
  getUsersSuccess,
  getUsersFailure,
  HydeHeader,
} from '../actions';
import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export interface UsersState {
  users: User[];
  isLoading: boolean;

  error: any;
}
export const initialUsersState: UsersState = {
  users: [],
  isLoading: false,

  error: null,
};

export const _usersReducer = createReducer(
  initialUsersState,
  on(get_users, (state) => ({ ...state, isLoading: true })),
  on(getUsersSuccess, (state, { users }) => ({
    ...state,
    isLoading: false,
    users: [...users],
  })),
  on(getUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
);
export function usersReducer(state, action) {
  return _usersReducer(state, action);
}

export const getAllUsersState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
  getAllUsersState,
  (state: UsersState) => state.users
);
