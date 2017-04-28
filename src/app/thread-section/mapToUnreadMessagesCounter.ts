import {ApplicationState} from '../store/application-state';
import {Thread} from '../../../shared/model/thread';

import * as _ from 'lodash';

export function mapToUnreadMessagesCounter(state: ApplicationState): number {
  const currentUserId = state.uiState.currentUserId;
  // _.value() will return an array of values (not keys) of given argument. We are specifying an array of type 'Thread'
  return _.values<Thread>(state.storeData.threads)
    .reduce(
      (accumulator, thread) => accumulator + thread.participants[currentUserId]
      , 0); // 0 is initial value of accumulator. thread implicitly refers to the result of the _.values() function.
}
