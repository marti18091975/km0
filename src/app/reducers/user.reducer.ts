import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models/user.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  get_user,
  getUserSuccess,
  getUserFailure,
  get_user_by_email,
  getUser_by_emailSuccess,
  getUser_by_email_Failure,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  setUserCity
  
} from '../actions';
import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export interface UserState extends EntityState<User> {
  id: string;
  user: User;
  isLoading: boolean;
  error: any;
  city:string;
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialUserState = adapter.getInitialState({
  id: null,
  user: null,
  isLoading: false,
  error: null,
  city:null
});

export const _userReducer = createReducer(
  initialUserState,
  on(get_user, (state, { id }) => ({ ...state, isLoading: true, id: id })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user: { ...user },
  })),
  on(getUserFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
  on(get_user_by_email, (state, { email }) => ({ ...state, email })),
  on(getUser_by_emailSuccess, (state, { user }) => ({
    ...state,

    user: { ...user },
  })),
  on(getUser_by_email_Failure, (state, { payload }) => ({
    ...state,
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
  
  on(createUser, (state, { user }) => ({ ...state, user: user })),
  on(createUserSuccess, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(createUserFailure, (state, { payload }) => ({
    ...state,
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
  on(updateUser, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
  on(setUserCity,(state,{city})=>({...state,city}))
);
export function userReducer(state, action) {
  return _userReducer(state, action);
}

export const getAllUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getAllUserState,
  (state: UserState) => state.user
);
