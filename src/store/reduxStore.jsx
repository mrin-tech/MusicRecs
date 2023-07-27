import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './authSlice';

const reducer = combineReducers({
    // add reducers here
    auth: authReducer,
})

const store = configureStore({
    reducer,
})

export default store;