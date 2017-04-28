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
import {Action, combineReducers, StoreModule} from '@ngrx/store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './store/application-state';

import {EffectsModule} from '@ngrx/effects';
import {LoadThreadsEffectService} from 'app/store/effects/load-threads-effect.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {uiState} from './store/reducers/uiState';
import {storeData} from './store/reducers/storeData';

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
    StoreModule.provideStore(combineReducers({
      uiState: uiState,
      storeData: storeData
    }), INITIAL_APPLICATION_STATE),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
