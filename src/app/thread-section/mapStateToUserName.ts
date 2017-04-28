import {ApplicationState} from '../store/application-state';

export function mapStateToUserName(state: ApplicationState): string {
  const currentUserId = state.uiState.currentUserId;
  return state.storeData.participants[currentUserId].name;
}
