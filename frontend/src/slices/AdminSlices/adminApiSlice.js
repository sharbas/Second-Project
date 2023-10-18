import { apiSlice } from "../apiSlice";

const ADMINS_URL='/api/admin'

export const adminsApiSlice=apiSlice.injectEndpoints({

endpoints:(builders)=>({
    login:builders.mutation({
        query:(data)=>({
            url:`${ADMINS_URL}/auth`,
            method:'POST',
            body:data,
        })
    }),
    logout:builders.mutation({
    query:()=>({
    url:`${ADMINS_URL}/logout`,
    method:'POST'
})
    })
})

})


export const {
    useLoginMutation,
    useLogoutMutation
}=adminsApiSlice;

