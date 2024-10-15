
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';


export const store = configureStore({
   reducer: {
      data: AuthSlice,
   },
   // error solve 
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

