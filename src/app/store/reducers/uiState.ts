import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {Action} from '@ngrx/store';
import {THREAD_SELECTED_ACTION, ThreadSelectedAction, UserThreadsLoadedAction} from '../actions';

export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION :
      return handleThreadSelectedAction(state, <ThreadSelectedAction>action);

    default:
      return state;
  }
};

export function handleThreadSelectedAction (state: UiState,
                                     action: ThreadSelectedAction): UiState {
  // Make a copy of state
  const newState = Object.assign({}, state);
  // Adjust newState
  newState.currentThreadId = action.payload;
  // Return newState
  return newState;

  /* or shorter =>
  return {
   currentUserId: state.currentUserId,
   currentThreadId: action.payload
  }
   */
}
