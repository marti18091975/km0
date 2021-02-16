import { Action, createReducer, on } from '@ngrx/store';

import { Product } from '../models/product.model';

import * as productActions from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProducerProductState {
    
    producerProducts:Product[];
    error: any;
  }
  
  export const initialProducerProductState:ProducerProductState = {
    
    producerProducts:null,
    error: null,
  };

  export const _producerProductReducer = createReducer(
    initialProducerProductState,
    on(productActions.getProductsByProducer, (state,{email}) => ({ ...state,email})),
  on(productActions.getProductsByProducerSuccess, (state, { producerProducts }) => ({
    ...state,
    
    producerProducts: [...producerProducts],
  })),
  on(productActions.getProductsByProducerFailure, (state, { payload }) => ({
    ...state,
    
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
  );
  export function producerProductReducer(state, action) {
    return _producerProductReducer(state, action);
  }
  
  export const getAllProducerProductState = createFeatureSelector<ProducerProductState>('producerProduct');
  
  export const getProducerProduct = createSelector(
    getAllProducerProductState,
    (state: ProducerProductState) => state.producerProducts
  );