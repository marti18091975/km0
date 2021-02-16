import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
export interface AppState {
  users: reducers.UsersState;
  user: reducers.UserState;
  header: reducers.HeaderState;
  product:reducers.ProductState;
  producerProducts:reducers.ProducerProductState;
  userProducts:reducers.UserProductState; 
  productsFiltered:reducers.ProductsFilteredState; 
  coordinates: reducers.CoordinateState;
  producer:reducers.ProducerState;
}
export const appReducers: ActionReducerMap<AppState> = {
  users: reducers.usersReducer,
  user: reducers.userReducer,
  header: reducers.headerReducer,
  product:reducers.productReducer,
  productsFiltered:reducers.productsFilteredReducer,
  producer:reducers.producerReducer,
  producerProducts:reducers.producerProductReducer,
  userProducts:reducers.userProductReducer,
  
  coordinates: reducers.coordinateReducer
};
