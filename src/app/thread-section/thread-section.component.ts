import { Component, OnInit } from '@angular/core';
import { ThreadsService } from './threads.service';

@Component({
  selector: 'thread-selection',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  constructor(
    private threadsService: ThreadsService
  ) { }

  ngOnInit() {
    // this.threadsService.loadUserThreads();
  }

}
