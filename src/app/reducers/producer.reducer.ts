import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models/user.model';
import {
    getProducer_by_email,
    getProducer_by_emailSuccess,
    getProducer_by_email_Failure,
  } from '../actions';
  import * as _ from 'lodash';
  import { createFeatureSelector, createSelector } from '@ngrx/store';
  export interface ProducerState  {
    id: string;
    producer:User;
  }
  
  export const initialProducerState :ProducerState={
    id: null,
    producer:null,
  };

  export const _producerReducer = createReducer(
    initialProducerState,
    on(getProducer_by_email, (state, { email }) => ({ ...state, email })),
  on(getProducer_by_emailSuccess, (state, { producer }) => ({
    ...state,
    producer: { ...producer },
  })),
  on(getProducer_by_email_Failure, (state, { payload }) => ({
    ...state,
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
  )
  export function producerReducer(state, action) {
    return _producerReducer(state, action);
  }
  
  export const getAllProducerState = createFeatureSelector<ProducerState>('producer');
  
  export const getProducer = createSelector(
    getAllProducerState,
    (state: ProducerState) => state.producer
  );