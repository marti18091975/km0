import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as productActions from '../actions';
import { Product } from '../models/product.model';

@Injectable()
export class ProductEffects{
    constructor(private actions$: Actions, private productService: ProductService) {}
    getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProduct),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          tap((data) => console.log('·····', data)),
          map((product:Product) => productActions.getProductSuccess({ product })),

          catchError((err) => of(productActions.getProductFailure({ payload: err })))
        )
      )
    )
  );
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProducts),
      tap((data) => console.log('!!!!', data)),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          tap((data) => console.log('·····', data)),
          map((products: any) => productActions.getProductsSuccess({ products })),

          catchError((err) => of(productActions.getProductsFailure({ payload: err})))
        )
      )
    )
  );
  
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.createProduct),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          tap((data) => console.log('·····', data)),
          map((product: Product) => productActions.createProductSuccess({ product: product })),
          catchError((err) =>
            of(productActions.createProductFailure({ payload: err }))
          )
        )
      )
    )
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.updateProduct),
      tap((data) => console.log('1234', data)),
      mergeMap((action) =>
        this.productService
          .updateProduct(action.update.id, action.update.changes)
          .pipe(
            tap((action) => console.log('5678', action)),
            map((product: Product) => productActions.updateProductSuccess({ product: product })),
            catchError((err) =>
              of(productActions.updateProductFailure({ payload: err }))
            )
          )
      )
    )
  );
  getProductsByCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProductsByCity),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.productService.getProductsByCity(action.city).pipe(
          tap((data) => console.log('·····', data)),
          map((products: any) => productActions.getProductsByCitySuccess({ products })),

          catchError((err) => of(productActions.getProductsByCityFailure({ payload: err})))
        )
      )
    )
  );
  getProductsByProducer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProductsByProducer),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.productService.getProductsByProducerEmail(action.email).pipe(
          tap((data) => console.log('·····', data)),
          map((producerProducts: any) => productActions.getProductsByProducerSuccess({ producerProducts })),

          catchError((err) => of(productActions.getProductsByProducerFailure({ payload: err})))
        )
      )
    )
  );
  getProductsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProductsByUser),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.productService.getProductsByUserEmail(action.email).pipe(
          tap((data) => console.log('·····', data)),
          map((userProducts: any) => productActions.getProductsByUserSuccess({ userProducts })),

          catchError((err) => of(productActions.getProductsByUserFailure({ payload: err})))
        )
      )
    )
  );
}