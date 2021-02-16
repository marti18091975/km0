import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

import * as producerActions from '../actions';
import { User } from '../models/user.model';

@Injectable()
export class ProducerEffects {
    constructor(private actions$: Actions, private userService: UserService) {}
    getProducerByEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(producerActions.getProducer_by_email),
            tap((data) => console.log('!!!!', data)),
                mergeMap((action) =>
                this.userService.getCurrentUser(action.email).pipe(
                    tap((data) => console.log('·····', data)),
                    map((producer: User) =>
                    producerActions.getProducer_by_emailSuccess({ producer: producer })
                    ),

                    catchError((err) =>
                    of(producerActions.getProducer_by_email_Failure({ payload: err }))
                    )
                )
            )
        )
    );
}