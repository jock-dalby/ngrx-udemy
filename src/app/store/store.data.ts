// Store data is a small in-memory database on the client-side.
// Therefore the structure should be similar to the part of the database we are bringing to client-side. See ~/src/server/db-data.ts

import {Participant} from '../../../shared/model/participant';
import {Thread} from '../../../shared/model/thread';
import {Message} from '../../../shared/model/message';

export interface StoreData {
  participants: {[key: number]: Participant};

  threads: {[key: number]: Thread};

  messages: {[key: number]: Message};
}

export const INITIAL_STORE_DATA: StoreData = {
  participants: {},
  threads: {},
  messages: {}
};
