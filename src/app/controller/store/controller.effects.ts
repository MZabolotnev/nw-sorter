import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as controllerActions from './controller.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import {ControllerService} from "./controller.service";

@Injectable()
export class ControllerEffects {
  constructor(private actions$: Actions, private controllerService: ControllerService) {}


  applyController$ = createEffect(() =>
    this.actions$.pipe(
      ofType(controllerActions.applyController),
      withLatestFrom(this.controllerService.controller$),
      switchMap(([action, controller]) => {
        return [controllerActions.applyControllerSuccess()];
      }),
    ),
  );
}
