import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { Header } from '../models/header.model';

export const GET_USERS = '[User]get_users';
export const GET_USERS_SUCCESS = '[User]get_users_success';
export const GET_USERS_FAILURE = '[User]get_users_failure';

export const get_users = createAction(GET_USERS);

export const getUsersSuccess = createAction(
  GET_USERS_SUCCESS,
  props<{ users: User[] }>()
);
export const getUsersFailure = createAction(
  GET_USERS_FAILURE,
  props<{ payload: any }>()
);
