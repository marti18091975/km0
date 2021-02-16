import { Action, createReducer, on } from '@ngrx/store';

import { Product } from '../models/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as productActions from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface ProductState extends EntityState<Product> {
    id: string;
    product: Product;
    
    products:Product[];
    
    producerProducts:Product[];
    error: any;
  }
  
  export const reducerAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();
  export const initialProductState = reducerAdapter.getInitialState({
    id: null,
    product: null,
    
    
    products:null,
    producerProducts:null,
    error: null,
  });
  export const _productReducer = createReducer(
    initialProductState,
    on(productActions.getProduct, (state, { id }) => ({ ...state,  id: id })),
    on(productActions.getProductSuccess, (state, { product }) => ({
      ...state,
      
      product: { ...product },
    })),
    on(productActions.getProductFailure, (state, { payload }) => ({
      ...state,
      
      error: { url: payload.url, name: payload.name, message: payload.message },
    })),
    on(productActions.getProducts, (state) => ({ ...state})),
  on(productActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    
    products: [...products],
  })),
  on(productActions.getProductsFailure, (state, { payload }) => ({
    ...state,
    
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
  on(productActions.getProductsByCity, (state,{city}) => ({ ...state,city})),
  on(productActions.getProductsByCitySuccess, (state, { products }) => ({
    ...state,
    
    products: [...products],
  })),
  on(productActions.getProductsByCityFailure, (state, { payload }) => ({
    ...state,
    
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),
   on(productActions.createProduct, (state, { product }) => ({ ...state, product: product })),
    on(productActions.createProductSuccess, (state, { product }) => ({
      ...state,
      product: { ...product },
    })),
    on(productActions.createProductFailure, (state, { payload }) => ({
      ...state,
      error: { url: payload.url, name: payload.name, message: payload.message },
    })),
    on(productActions.updateProduct, (state, action) => {
      return reducerAdapter.updateOne(action.update, state);
    }),
    on(productActions.updateProductSuccess, (state, { product }) => ({
      ...state,
      product: { ...product },
    })),
    on(productActions.updateProductFailure, (state, { payload }) => ({
      ...state,
      error: { url: payload.url, name: payload.name, message: payload.message },
    })),
    
  );
  export function productReducer(state, action) {
    return _productReducer(state, action);
  }
  export const getAllProductState = createFeatureSelector<ProductState>('product');

export const getProduct = createSelector(
  getAllProductState,
  (state: ProductState) => state.product
);
  
  
  
  
 
  