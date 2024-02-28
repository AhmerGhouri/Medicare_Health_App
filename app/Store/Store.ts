import { configureStore } from '@reduxjs/toolkit'
import  cartReducer  from '../slices/cartSlice'
import patientReducer from '../slices/patientSlice'
import userReducer from '../slices/userSlice'
import serviceReducer from '../slices/serviceSlice'
// ...

export const store = configureStore({
  reducer : {
    cart : cartReducer,
    patient : patientReducer,
    user : userReducer,
    code : serviceReducer
  },
  devTools : process.env.NODE_ENV !== 'production'
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}



// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// Infer the `RootState` and `AppDispatch` types from the store itself

