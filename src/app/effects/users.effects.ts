import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

import * as userActions from '../actions/users.actions';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.get_users),
      tap((data) => console.log('!!!!', data)),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          tap((data) => console.log('·····', data)),
          map((users: any) => userActions.getUsersSuccess({ users })),

          catchError((err) => of(userActions.getUsersFailure({ payload: err })))
        )
      )
    )
  );
}
