import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CoordinateService } from '../services/coordinate.service';

import * as coordinateActions from '../actions';
@Injectable()
export class CoordinateEffects{
    constructor(private actions$:Actions,private coordinateService:CoordinateService){}
    getCoordinates$=createEffect(()=>this.actions$.pipe(ofType(coordinateActions.getCoordinates),
    tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        
        this.coordinateService.getCoordinates(action.city,action.street,action.number).pipe(
          tap((data) => console.log('·····', data)),
          map((coordinates:any) => coordinateActions.getCoordinatesSuccess({ coordinates })),

          catchError((err) => of(coordinateActions.getCoordinatesFailure({ payload: err })))
        ))))
}