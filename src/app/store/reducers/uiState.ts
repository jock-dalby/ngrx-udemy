import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {Action} from '@ngrx/store';
import {
  SELECT_USER_ACTION, SelectUserAction, THREAD_SELECTED_ACTION, ThreadSelectedAction,
  UserThreadsLoadedAction
} from '../actions';

export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION :
      return handleThreadSelectedAction(state, <ThreadSelectedAction>action);

    case SELECT_USER_ACTION :
      return handleSelectUserAction(state, <SelectUserAction>action);

    default:
      return state;
  }
};

function handleThreadSelectedAction (state: UiState,
                                     action: ThreadSelectedAction): UiState {
  // Make a copy of state
  const newUiState = Object.assign({}, state);
  // Adjust newUiState
  newUiState.currentThreadId = action.payload;
  // Return newUiState
  return newUiState;
}

/* or shorter => */

function handleSelectUserAction(state: UiState,
                                action: SelectUserAction): UiState {
  return {
    currentUserId: action.payload,
    currentThreadId: undefined
  };
}

