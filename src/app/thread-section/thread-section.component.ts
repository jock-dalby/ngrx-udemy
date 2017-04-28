import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { ThreadsService } from '../services/threads.service';
import {ApplicationState} from '../store/application-state';
import {AllUserData} from '../../../shared/to/all-user-data';
import {LoadUserThreadsAction} from '../store/actions';
import {Thread} from '../../../shared/model/thread';

import * as _ from 'lodash';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'thread-selection',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  userName$: Observable<string>; // $ is used to signify that a variable is an observable
  unreadMessagesCounter$: Observable<number>;

  constructor(
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {

    this.userName$ = store
      .skip(1) // Skip the initial value before the store has been populated
      .map(this.mapStateToUserName); // map needs a function that operates on the applicationState as an argument.

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(this.mapToUnreadMessagesCounter);
  }

  mapStateToUserName(state: ApplicationState): string {
    const currentUserId = state.uiState.currentUserId;
    return state.storeData.participants[currentUserId].name;
  }

  mapToUnreadMessagesCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.currentUserId;
    // _.value() will return an array of values (not keys) of given argument. We are specifying an array of type 'Thread'
    return _.values<Thread>(state.storeData.threads)
      .reduce(
        (accumulator, thread) => accumulator + thread.participants[currentUserId]
        , 0); // 0 is initial value of accumulator. thread implicitly refers to the result of the _.values() function.
  }

  ngOnInit() {

    // This is a smart component. When it is initialised, we call the backend REST api using the threadsService.
    this.threadsService.loadUserThreads()
      .subscribe(
        (allUserData: AllUserData) => {
          this.store.dispatch(
            new LoadUserThreadsAction(allUserData)
          );
          // Once we receive the data from the backend we call the store and dispatch an 'action'. We are telling the store there is new data available from the backend and we are passing it in as the payload of this action. The store will then trigger it's reducer function configured in app.module.ts.
        }
      );
  }

}
