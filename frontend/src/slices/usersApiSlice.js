import { apiSlice } from "./apiSlice.js";
const USERS_URL = "/api/users";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builders.mutation({
      query: (data) => ({
  
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    
    updateUser: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    forgotPassword: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyOtp: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyOtp`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builders.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    googleAuth:builders.mutation({
      query:(data)=>({
        url:`${USERS_URL}/oauth`,
        method:'POST',
        body:data
      })
    }),
    googelLogin:builders.mutation({
      query:(data)=>({
        url:`${USERS_URL}/g-login`,
        method:'POST',
        body:data
      })
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGoogleAuthMutation,
  useGoogelLoginMutation
} = usersApiSlice;
