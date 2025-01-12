import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageslice';

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export default store;
