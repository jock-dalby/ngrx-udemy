import {StoreData} from './store.data';
import {UiState} from './ui-state';

export interface ApplicationState {
  uiState: UiState;
  storeData: StoreData;
}
