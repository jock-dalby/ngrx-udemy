import { Component, OnInit } from '@angular/core';
import { ThreadsService } from './threads.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';

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
        console.log
      );
  }

}
