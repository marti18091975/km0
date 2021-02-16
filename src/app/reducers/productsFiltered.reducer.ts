import { Action, createReducer, on } from '@ngrx/store';

import { Product } from '../models/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as productActions from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsFilteredState  {
    
    productsFiltered:Product[];
  }
  
export const initialProductsFilteredState :ProductsFilteredState={

productsFiltered:null,
};

export const _productsFilteredReducer=createReducer(
    initialProductsFilteredState,
    on(productActions.setProductsFiltered,(state,{productsFiltered})=>({
        ...state,
        productsFiltered
      }))
      )

export function productsFilteredReducer(state, action) {
return _productsFilteredReducer(state, action);
}
export const getAllProductsFilteredState = createFeatureSelector<ProductsFilteredState>('productsFiltered');

export const getProductsFiltered = createSelector(
    getAllProductsFilteredState,
    (state: ProductsFilteredState) => state.productsFiltered
);