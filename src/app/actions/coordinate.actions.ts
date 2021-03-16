import { createAction, props } from '@ngrx/store';
export const GET_COORDINATES = '[Coordinates]get_coordinates';
export const GET_COORDINATES_SUCCESS = '[Coordinates]get_coordinates_success';
export const GET_COORDINATES_FAILURE = '[Coordinates]get_coordinates_failure';
export const GET_CURRENT_COORDINATES = '[Coordinates]get_coordinates';
export const GET_CURRENT_COORDINATES_SUCCESS = '[Coordinates]get_coordinates_success';
export const GET_CURRENT_COORDINATES_FAILURE = '[Coordinates]get_coordinates_failure';
export const getCoordinates = createAction(GET_COORDINATES, props<{ city: string,street:string,number:number }>());

export const getCoordinatesSuccess = createAction(
  GET_COORDINATES_SUCCESS,
  props<{ coordinates:any}>()
);
export const getCoordinatesFailure = createAction(
  GET_COORDINATES_FAILURE,
  props<{ payload: any }>()
);
export const getCurrentCoordinates = createAction(GET_CURRENT_COORDINATES);

export const getCurrentCoordinatesSuccess = createAction(
  GET_CURRENT_COORDINATES_SUCCESS,
  props<{ coordinates:any}>()
);
export const getCurrentCoordinatesFailure = createAction(
  GET_CURRENT_COORDINATES_FAILURE,
  props<{ payload: any }>()
);