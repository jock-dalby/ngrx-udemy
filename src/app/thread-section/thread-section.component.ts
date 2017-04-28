import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { ThreadsService } from '../services/threads.service';
import {ApplicationState} from '../store/application-state';
import {AllUserData} from '../../../shared/to/all-user-data';
import {LoadUserThreadsAction} from '../store/actions';
import {Thread} from '../../../shared/model/thread';

// import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import 'rxjs/add/operator/skip';
import {Observable} from 'rxjs/Observable';
import {ThreadSummaryVM} from './thread-summary.vm';
import {mapToUnreadMessagesCounter} from './mapToUnreadMessagesCounter';
import {mapStateToUserName} from './mapStateToUserName';

@Component({
  selector: 'thread-selection',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  userName$: Observable<string>; // $ is used to signify that a variable is an observable
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {

    this.userName$ = store
      .skip(1) // Skip the initial value before the store has been populated
      .map(mapStateToUserName); // map needs a function that operates on the applicationState as an argument.

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapToUnreadMessagesCounter);

    this.threadsSummaries$ = store.select(
      state => {
        const threads = _.values<Thread>(state.storeData.threads);

        return threads.map(thread => {

          const names = _.keys(thread.participants).map(
            participantId => state.storeData.participants[participantId].name);

          const lastMessageId = _.last(thread.messageIds),
            lastMessage = state.storeData.messages[lastMessageId];

          return {
            id: thread.id,
            participantNames: _.join(names, ', '),
            lastMessageText: state.storeData.messages[lastMessageId].text,
            timestamp: lastMessage.timestamp
          };
        });
      }
    );
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
