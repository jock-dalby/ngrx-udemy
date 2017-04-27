import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {AllUserData} from '../../../shared/to/all-user-data';
import {LoadUserThreadsAction} from '../store/actions';

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

  constructor(
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip(1) // Skip the initial value before the store has been populated
      .map(this.mapStateToUserName) // map needs a function that operates on the applicationState as an argument.
  }

  mapStateToUserName(state: ApplicationState): string {
    const currentUserId = state.uiState.currentUserId;
    return state.storeData.participants[currentUserId].name;
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
