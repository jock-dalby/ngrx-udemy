

import {INITIAL_STORE_DATA, StoreData} from '../store.data';
import {Action} from '@ngrx/store';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';


export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleUserThreadsLoadedAction(state, <any>action);

    default:
      return state;
  }
}

function handleUserThreadsLoadedAction(state: StoreData,
                                       action: UserThreadsLoadedAction): StoreData {
  return {
    // convert array into a map and use the index of the array as an id for the map. Using lodash
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };

  /* No longer required, kept for reference */
  // It is important that reducer functions never adjust the contents of the state directly. So we always make a copy of the state, adjust it and then re-assign it
  // const newState: StoreData = Object.assign({}, state);
  // const userData = action.payload;
}
