import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { ThreadsService } from '../services/threads.service';
import {ApplicationState} from '../store/application-state';
import {AllUserData} from '../../../shared/to/all-user-data';
import {LoadUserThreadsAction, ThreadSelectedAction, UserThreadsLoadedAction} from '../store/actions';

// import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ThreadSummaryVM} from './thread-summary.vm';
import {mapToUnreadMessagesCounter} from './mapToUnreadMessagesCounter';
import {userNameSelector} from './userNameSelector';
import {stateToThreadSummariesSelector} from './stateToThreadSummariesSelector';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  userName$: Observable<string>; // $ is used to signify that a variable is an observable
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;

  constructor(private store: Store<ApplicationState>) {

    this.userName$ = store
    // .skip(1)  => Skip the initial value. This is so when the app loads if store has not been populated we do not get errors. Best practice is to account for this in your selector functions to make code more robust.
      .map(userNameSelector); // map needs a function that operates on the applicationState as an argument.

    this.unreadMessagesCounter$ = store.map(mapToUnreadMessagesCounter);

    this.threadsSummaries$ = store.select(stateToThreadSummariesSelector);

    this.currentSelectedThreadId$ = store.select(
      (state: ApplicationState): number => state.uiState.currentThreadId
    );
  }

  // Above we define Observables with both the map() function and using the select call the store. These two ways of transforming the store application state into the viewModel that the component needs are equivalent. They are both ways of applying a mapping of two models and in this instance can be used interchangeably.

  ngOnInit() {

    this.store.dispatch(new LoadUserThreadsAction());

  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}

// SUMMARY: This implementation of this smart component is minimal; We are only injecting the store.
// If this was a larger application with multiple services, by injecting them into the store we do not need to have them operating in multiple components. In smart components implemented this way we simply inject the store, dispatch actions back to it and the effects services will load/save any data to the backend. In this component we also define the Observables that the view needs and configure the mapping selector functions that we need from the ApplicationState to the ViewModel, in the constructor.
