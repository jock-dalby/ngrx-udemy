import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {Observable} from 'rxjs/Observable';
import {MessageVM} from './message.vm';
import {messagesSelector} from './messagesSelector';
import {messageParticipantNamesSelector} from './messageParticipantNamesSelector';
import {SendNewMessageAction} from '../store/actions';
import {UiState} from '../store/ui-state';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})

export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {

    this.participantNames$ = store.select(messageParticipantNamesSelector);

    this.messages$ = store.select(messagesSelector);

    // Create a copy of uiState to a member variable
    store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
  }

  onNewMessage(input: any) {
    this.store.dispatch(new SendNewMessageAction({
        text: input.value,
        threadId: this.uiState.currentThreadId,
        participantId: this.uiState.currentUserId
    }));
    input.value = '';
  }


}
