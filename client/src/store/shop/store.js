import{ configureStore }from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
let configPersist = {
    key:'root',
    storage
}
const reducers = combineReducers({
cart : cartSlice
})
const persistor = persistReducer(configPersist,reducers)
export default configureStore({reducer:persistor,middleware:[thunk,logger]});