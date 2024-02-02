import {
  Action,
  combineReducers,
  configureStore,
  createAction,
  Reducer,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import filesReducer from '@/store/files/files.slice';

const RESET_STORE_ACTION_KEY = 'rootStore/resetAll';
export const resetStore = createAction(RESET_STORE_ACTION_KEY);

const combinedReducer = combineReducers({
  files: filesReducer,
});

const rootReducer: Reducer = (state: ReturnType<typeof combinedReducer>, action: UnknownAction) => {
  if (action.type === RESET_STORE_ACTION_KEY) {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
