import { configureStore } from '@reduxjs/toolkit';

// Import reducers from features
import playerReducer from './features/playerSlice';

// Define the store using configureStore
export const store = configureStore({
    reducer: {
      player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;