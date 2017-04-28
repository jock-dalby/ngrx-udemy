import {ApplicationState} from '../store/application-state';

export function userNameSelector(state: ApplicationState): string {
  const currentUserId = state.uiState.currentUserId,
    currentParticipant = state.storeData.participants[currentUserId];

  // Avoid using skip() in component.ts by checking for initial state returning undefined
  if (!currentParticipant) {
    return '';
  };

  return currentParticipant.name;
}
