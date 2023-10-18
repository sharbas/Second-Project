import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {apiSlice} from './slices/apiSlice.js'
import { apiSlice } from './slices/HotelSlices/apiSlice.js'
import { apiSlice } from './slices/AdminSlices/apiSlice.js'
import authReducer from './slices/authSlice.js'
import hotelAuthReducer from './slices/HotelSlices/hotelAuthSlice.js'
import adminReducer from './slices/AdminSlices/adminAuthSlice.js'



const store=configureStore({
    reducer:{

    hotelauth:hotelAuthReducer,
    adminauth:adminReducer,
    auth :authReducer,
       [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store