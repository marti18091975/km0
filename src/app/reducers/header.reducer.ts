import { Action } from '@ngrx/store';
import { Header } from '../models/header.model';
import * as HeaderActions from '../actions/header-actions';
import { createReducer, on } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface HeaderState {
  isShown: boolean;
}
const initialHeaderState: HeaderState = { isShown: false };
export const _headerReducer = createReducer(
  initialHeaderState,
  on(HeaderActions.HydeHeader, (state, { isShown }) => ({ isShown }))
);

export function headerReducer(state, action) {
  return _headerReducer(state, action);
}

export const getAllHeaderState = createFeatureSelector<HeaderState>('Header');

export const getHeader = createSelector(
  getAllHeaderState,
  (state: HeaderState) => state.isShown
);
