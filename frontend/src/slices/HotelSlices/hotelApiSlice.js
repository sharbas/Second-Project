import { apiSlice } from "./apiSlice";

const HOTELS_URL='api/hotel'

export const hotelApiSlice=apiSlice.injectEndpoints({
    endpoints:(builders)=>({
        login:builders.mutation({
            query:(data)=>({
                url:`${HOTELS_URL}/auth`,
                method:'POST',
                body:data,
            })
        }),
        register:builders.mutation({
            query:(data)=>({
                url:`${HOTELS_URL}/register`,
                method:'POST',
                body:data,
            })
        }),
        googleAuth:builders.mutation({
            query:(data)=>({
                url:`${HOTELS_URL}/oauth`,
                method:'POST',
                body:data
            })
        }),
        googleLogin:builders.mutation({
            query:(data)=>({
                url:`${HOTELS_URL}/g-login`,
                method:'POST',
                body:data
            })
        }),
        logout:builders.mutation({
            query:(data)=>({
                url:`${HOTELS_URL}/logout`,
                method:'POST',
                body:data,
            })
        }),
    })
})

export const{
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGoogleAuthMutation,
    useGoogleLoginMutation

}=hotelApiSlice