import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

import * as userActions from '../actions';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.get_user),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.userService.getUser(action.id).pipe(
          tap((data) => console.log('·····', data)),
          map((user: User) => userActions.getUserSuccess({ user: user })),

          catchError((err) => of(userActions.getUserFailure({ payload: err })))
        )
      )
    )
  );
  getUserByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.get_user_by_email),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.userService.getCurrentUser(action.email).pipe(
          tap((data) => console.log('·····', data)),
          map((user: User) =>
            userActions.getUser_by_emailSuccess({ user: user })
          ),

          catchError((err) =>
            of(userActions.getUser_by_email_Failure({ payload: err }))
          )
        )
      )
    )
  );
  
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      tap((data) => console.log('!!!!', data)),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          tap((data) => console.log('·····', data)),
          map((user: User) => userActions.createUserSuccess({ user: user })),
          catchError((err) =>
            of(userActions.createUserFailure({ payload: err }))
          )
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      tap((data) => console.log('1234', data)),
      mergeMap((action) =>
        this.userService
          .updateUser(action.update.id, action.update.changes)
          .pipe(
            tap((action) => console.log('5678', action)),
            map((user: User) => userActions.updateUserSuccess({ user: user })),
            catchError((err) =>
              of(userActions.updateUserFailure({ payload: err }))
            )
          )
      )
    )
  );
}
