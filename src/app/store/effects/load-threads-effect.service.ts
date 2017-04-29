import { Injectable } from '@angular/core';
import {ThreadsService} from '../../services/threads.service';
import {Actions, Effect} from '@ngrx/effects';
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, SELECT_USER_ACTION, UserThreadsLoadedAction} from '../actions';
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
    .do(val => console.log('Do action received', val)) // output the value at any point in Observable operator chain.
    .debug('Debug action received') // See debug declaration in main.ts file
    .switchMap(() => this.threadsService.loadUserThreads()) // Once we receive an action of this type, we make HTTP request to backend.
    .do(val => console.log('data received via Http request', val))
    .debug('Debug action received') // See debug declaration in main.ts file
    .map(alluserData => new UserThreadsLoadedAction(alluserData)); // When we get data back, we map the value and create a new instance of UserThreadsLoadedAction and pass it the data

  @Effect() newUserSelected$: Observable<Action> = this.actions$
    .ofType(SELECT_USER_ACTION)
    .debug('New user selected')
    .map(() => new LoadUserThreadsAction());
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
