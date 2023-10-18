import { CreateApi,createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery=fetchBaseQuery({baseUrl:''})
export const apiSlice=createApi({
    baseQuery,
    tagTypes:['Admin'],
    endpoints:(builder)=>({})
})