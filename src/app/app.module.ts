import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSelectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-section/thread-list/thread-list.component';
import { MessageListComponent } from './message-section/message-list/message-list.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsService } from './services/threads.service';
import {Action, StoreModule} from '@ngrx/store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './store/application-state';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from './store/actions';

import * as _ from 'lodash';
import {EffectsModule} from '@ngrx/effects';
import {LoadThreadsEffectService} from 'app/store/effects/load-threads-effect.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// storeReducer takes in the current internal state and the action it receives and the output will be the new ApplicationState.
// The store will then notify all parties that are subscribed to the store that the state has changed.

export function storeReducer(
  state: ApplicationState = INITIAL_APPLICATION_STATE,
  action: Action
): ApplicationState {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleUserThreadsLoadedAction(state, <any>action);

    default:
      return state;
  };
}

function handleUserThreadsLoadedAction(state: ApplicationState,
                                     action: UserThreadsLoadedAction): ApplicationState {

  // It is important that reducer functions never adjust the contents of the state directly. So we always make a copy of the state, adjust it and then re-assign it
  const newState: ApplicationState = Object.assign({}, state);
  const userData = action.payload;

  newState.storeData = {
    // convert array into a map and use the index of the array as an id for the map. Using lodash
    participants: _.keyBy(userData.participants, 'id'),
    messages: _.keyBy(userData.messages, 'id'),
    threads: _.keyBy(userData.threads, 'id')
  };

  return newState;
}


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSelectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EffectsModule.run(LoadThreadsEffectService),
    // Can pass in INITIAL_APPLICATION_STATE as second argument or set it as default value for state in storeReducer function.
      // StoreModule.provideStore(storeReducer, INITIAL_APPLICATION_STATE)
    StoreModule.provideStore(storeReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
