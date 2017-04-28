import { Injectable } from '@angular/core';
import {ThreadsService} from '../../services/threads.service';
import {Actions, Effect} from '@ngrx/effects';
import {LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction} from '../actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

@Injectable()
export class LoadThreadsEffectService {

  constructor(
    private actions$: Actions,
    private threadsService: ThreadsService
  ) { }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION) // Filter out the 'LOAD_USER_THREADS_ACTION' calls.
    .switchMap(() => this.threadsService.loadUserThreads()) // Once we receive an action of this type, we make HTTP request to backend.
    .map(alluserData => new UserThreadsLoadedAction(alluserData)); // When we get data back, we map the value and create a new instance of UserThreadsLoadedAction and pass it the data
}

// The Actions Observable from '@ngrx/effects' will emit a value (actions$) for  each action we dispatch to the store.
// Every time an action is dispatched, the actions$ Observable will be triggered.

// The effect decorator marks the action$ Observable as being a source of actions so we do not need to subscribe as we would do below.

/*
this.threadsService.loadUserThreads()
  .subscribe(
    (allUserData: AllUserData) => {
      this.store.dispatch(
        new UserThreadsLoadedAction(allUserData)
      );
    }
  );
*/

// The added benefit of introducing ngrx/effects
