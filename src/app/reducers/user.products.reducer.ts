import { Action, createReducer, on } from '@ngrx/store';

import { Product } from '../models/product.model';

import * as productActions from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserProductState {
    
    userProducts:Product[];
    error: any;
  }
  
  export const initialUserProductState:UserProductState = {
    
    userProducts:null,
    error: null,
  };

  export const _userProductReducer = createReducer(
    initialUserProductState,
    on(productActions.getProductsByUser, (state,{email}) => ({ ...state,email})),
  on(productActions.getProductsByUserSuccess, (state, { userProducts }) => ({
    ...state,
    
    userProducts: [...userProducts],
  })),
  on(productActions.getProductsByUserFailure, (state, { payload }) => ({
    ...state,
    
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
  );
  export function userProductReducer(state, action) {
    return _userProductReducer(state, action);
  }
  
  export const getAllUserProductState = createFeatureSelector<UserProductState>('userProduct');
  
  export const getUserProduct = createSelector(
    getAllUserProductState,
    (state: UserProductState) => state.userProducts
  );