import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { Update } from '@ngrx/entity';

export const GET_USER = '[User]get_user';
export const GET_USER_SUCCESS = '[User]get_user_success';
export const GET_USER_FAILURE = '[User]get_user_failure';
export const GET_USER_BY_EMAIL = '[User]get_user_by_email';
export const GET_USER_BY_EMAIL_SUCCESS = '[User]get_user_by_email_success';
export const GET_USER_BY_EMAIL_FAILURE = '[User]get_user_by_email_failure';
export const GET_PRODUCER_BY_EMAIL='[Producer]get_producer_by_email';
export const GET_PRODUCER_BY_EMAIL_SUCCESS='[Producer]get_producer_by_email_success';
export const GET_PRODUCER_BY_EMAIL_FAILURE='[Producer]get_producer_by_email_failure';
export const CREATE_USER = '[User]create_user';
export const CREATE_USER_SUCCESS = '[User]create_user_success';
export const CREATE_USER_FAILURE = '[User]create_user_failure';
export const UPDATE_USER = '[User]update_user';
export const UPDATE_USER_SUCCESS = '[User]update_user_success';
export const UPDATE_USER_FAILURE = '[User]update_user_failure';
export const SET_USER_CITY='[User]set_user_city';

export const get_user = createAction(GET_USER, props<{ id: string }>());

export const getUserSuccess = createAction(
  GET_USER_SUCCESS,
  props<{ user: User }>()
);
export const getUserFailure = createAction(
  GET_USER_FAILURE,
  props<{ payload: any }>()
);

export const get_user_by_email = createAction(
  GET_USER_BY_EMAIL,
  props<{ email: string }>()
);

export const getUser_by_emailSuccess = createAction(
  GET_USER_BY_EMAIL_SUCCESS,
  props<{ user: User }>()
);
export const getUser_by_email_Failure = createAction(
  GET_USER_BY_EMAIL_FAILURE,
  props<{ payload: any }>()
);
export const getProducer_by_email = createAction(
  GET_PRODUCER_BY_EMAIL,
  props<{ email: string }>()
);

export const getProducer_by_emailSuccess = createAction(
  GET_PRODUCER_BY_EMAIL_SUCCESS,
  props<{producer:User }>()
);
export const getProducer_by_email_Failure = createAction(
  GET_PRODUCER_BY_EMAIL_FAILURE,
  props<{ payload: any }>()
);

export const createUser = createAction(CREATE_USER, props<{ user: User }>());
export const createUserSuccess = createAction(
  CREATE_USER_SUCCESS,
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  CREATE_USER_FAILURE,
  props<{ payload: any }>()
);
export const updateUser = createAction(
  UPDATE_USER,
  props<{ update: Update<User> }>()
);
export const updateUserSuccess = createAction(
  UPDATE_USER_SUCCESS,
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  UPDATE_USER_FAILURE,
  props<{ payload: any }>()
);
export const setUserCity=createAction(SET_USER_CITY,props<{city:string}>());
