import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';
import { Update } from '@ngrx/entity';
import {Types} from '../models/types.model';

export const GET_PRODUCT = '[Product]get_product';
export const GET_PRODUCT_SUCCESS = '[Product]get_product_success';
export const GET_PRODUCT_FAILURE = '[Product]get_product_failure';
export const GET_PRODUCTS = '[Product]get_products';
export const GET_PRODUCTS_SUCCESS = '[Product]get_products_success';
export const GET_PRODUCTS_FAILURE = '[Product]get_products_failure';
export const CREATE_PRODUCT = '[Product]create_product';
export const CREATE_PRODUCT_SUCCESS = '[Product]create_product_success';
export const CREATE_PRODUCT_FAILURE = '[Product]create_product_failure';
export const UPDATE_PRODUCT = '[Product]update_product';
export const UPDATE_PRODUCT_SUCCESS = '[Product]update_product_success';
export const UPDATE_PRODUCT_FAILURE = '[Product]update_product_failure';
export const GET_PRODUCTS_BY_CITY = '[Product]get_products_by_city';
export const GET_PRODUCTS_BY_CITY_SUCCESS = '[Product]get_products_by_city_success';
export const GET_PRODUCTS_BY_CITY_FAILURE = '[Product]get_products_by_city_failure';
export const GET_PRODUCTS_BY_PRODUCER = '[Product]get_products_by_producer';
export const GET_PRODUCTS_BY_PRODUCER_SUCCESS = '[Product]get_products_by_producer_success';
export const GET_PRODUCTS_BY_PRODUCER_FAILURE = '[Product]get_products_by_producer_failure';
export const GET_PRODUCTS_BY_USER = '[Product]get_products_by_user';
export const GET_PRODUCTS_BY_USER_SUCCESS = '[Product]get_products_by_user_success';
export const GET_PRODUCTS_BY_USER_FAILURE = '[Product]get_products_by_user_failure';

export const GET_PRODUCT_BY_TYPE='[Product]get_product_by_type';
export const SET_PRODUCT_FILTERED='[Product]set_product_filtered';
export const getProduct = createAction(GET_PRODUCT, props<{ id: string }>());

export const getProductSuccess = createAction(
  GET_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const getProductFailure = createAction(
  GET_PRODUCT_FAILURE,
  props<{ payload: any }>()
);
export const getProducts = createAction(GET_PRODUCTS);

export const getProductsSuccess = createAction(
  GET_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);
export const getProductsFailure = createAction(
  GET_PRODUCTS_FAILURE,
  props<{ payload: any }>()
);
export const getProductsByCity = createAction(GET_PRODUCTS_BY_CITY,props<{city:string}>());

export const getProductsByCitySuccess = createAction(
  GET_PRODUCTS_BY_CITY_SUCCESS,
  props<{ products: Product[] }>()
);
export const getProductsByCityFailure = createAction(
  GET_PRODUCTS_BY_CITY_FAILURE,
  props<{ payload: any }>()
);

export const getProductsByProducer = createAction(GET_PRODUCTS_BY_PRODUCER,props<{email:string}>());

export const getProductsByProducerSuccess = createAction(
  GET_PRODUCTS_BY_PRODUCER_SUCCESS,
  props<{ producerProducts: Product[] }>()
);
export const getProductsByProducerFailure = createAction(
  GET_PRODUCTS_BY_PRODUCER_FAILURE,
  props<{ payload: any }>()
);
export const getProductsByUser = createAction(GET_PRODUCTS_BY_USER,props<{email:string}>());

export const getProductsByUserSuccess = createAction(
  GET_PRODUCTS_BY_USER_SUCCESS,
  props<{ userProducts: Product[] }>()
);
export const getProductsByUserFailure = createAction(
  GET_PRODUCTS_BY_USER_FAILURE,
  props<{ payload: any }>()
);

export const createProduct = createAction(CREATE_PRODUCT, props<{ product: Product }>());
export const createProductSuccess = createAction(
  CREATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const createProductFailure = createAction(
  CREATE_PRODUCT_FAILURE,
  props<{ payload: any }>()
);
export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{ update: Update<Product> }>()
);
export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  UPDATE_PRODUCT_FAILURE,
  props<{ payload: any }>()
);

export const getProductByType=createAction(
  GET_PRODUCT_BY_TYPE
  
)
export const setProductsFiltered=createAction(
  SET_PRODUCT_FILTERED,
  props<{productsFiltered:Product[]}>()
)
