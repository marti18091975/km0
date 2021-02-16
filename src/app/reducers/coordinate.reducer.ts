import { Action, createReducer, on } from '@ngrx/store';
import * as coordinateActions from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {Coordinates} from '../models/coordinates.model';
export interface CoordinateState  {
    coordinates:any
  }
  export const initialCoordinateState:CoordinateState ={
      coordinates:null
  }
  export const _coordinateReducer = createReducer(
    initialCoordinateState,
    on(coordinateActions.getCoordinates, (state,{city,street,number}) => ({ ...state,city,street,number})),
    on(coordinateActions.getCoordinatesSuccess, (state, { coordinates }) => ({
      ...state,
      coordinates
    })),
    on(coordinateActions.getCoordinatesFailure, (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: { url: payload.url, name: payload.name, message: payload.message },
    }))
  );
  export function coordinateReducer(state,action){
      return _coordinateReducer(state, action);
  }
  export const getAllCoordinateState = createFeatureSelector<CoordinateState>('coordinate');

export const getCoordinate = createSelector(
  getAllCoordinateState,
  (state: CoordinateState) => state.coordinates
);
