import { createAction, props } from '@ngrx/store';
import { Header } from '../models/header.model';
export const HYDE_HEADER = '[HEADER]Hyde';
export const HydeHeader = createAction(
  HYDE_HEADER,
  props<{ isShown: boolean }>()
);
