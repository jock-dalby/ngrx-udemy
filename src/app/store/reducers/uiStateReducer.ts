import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {Action} from '@ngrx/store';
import {THREAD_SELECTED_ACTION, UserThreadsLoadedAction} from '../actions';

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION :
      return handleThreadSelectedAction(state, <any>action);

    default:
      return state;
  }
};

function handleThreadSelectedAction (state: UiState,
                                     action: UserThreadsLoadedAction): UiState {
  return state;
}
