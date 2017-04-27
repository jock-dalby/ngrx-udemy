export interface UiState {
  currentUserId: number;
  currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
  currentUserId: 1,
  currentThreadId: undefined
};
