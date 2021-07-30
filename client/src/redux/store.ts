import { configureStore, ThunkAction, Action, createStore } from '@reduxjs/toolkit';
import {EmployeesReducer} from './EmployeesReducer';

export const store = createStore(EmployeesReducer)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
