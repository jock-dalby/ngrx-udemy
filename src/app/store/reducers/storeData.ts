import {INITIAL_STORE_DATA, StoreData} from '../store.data';
import {Action} from '@ngrx/store';
import {
  SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, USER_THREADS_LOADED_ACTION,
  UserThreadsLoadedAction
} from '../actions';
import * as _ from 'lodash';
import {Message} from '../../../../shared/model/message';

const uuid = require('uuid/V4');

export function storeData(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleUserThreadsLoadedAction(state, <any>action);
    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, <any>action);

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

function handleSendNewMessageAction(state: StoreData,
                                    action: SendNewMessageAction): StoreData {

  const newStoreState = _.cloneDeep(state);
  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  }

  currentThread.messageIds.push(newMessage.id);

  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}
