import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {AllUserData} from '../../../shared/to/all-user-data';
import {LoadUserThreadsAction} from '../store/actions';

@Component({
  selector: 'thread-selection',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  constructor(
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {
    store.subscribe(
      console.log
    )
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
      .subscribe(
        (allUserData: AllUserData) => {
          this.store.dispatch(
            new LoadUserThreadsAction(allUserData)
          );
          // dispatch() dispatches an 'action'. In store/actions.ts when we define LoadUserThreadsAction, the constructor requires us to pass an argument of type AllUserData.
        }
      );
  }

}
