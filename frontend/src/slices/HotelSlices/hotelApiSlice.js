import { apiSlice } from "./apiSlice";

const HOTELS_URL = "/api/hotel";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (data) => ({
        url: `${HOTELS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builders.mutation({
      query: (data) => ({
        url: `${HOTELS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    updateHotelUser: builders.mutation({
      query: (data) => ({
        url: `${HOTELS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    hotelForgotPassword: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    hotelVerifyOtp: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyOtp`,
        method: "POST",
        body: data,
      }),
    }),
    hotelResetPassword: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: "POST",
        body: data,
      }),
    }),
   
    logout: builders.mutation({
      query: (data) => ({
        url: `${HOTELS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useHotelForgotPasswordMutation,
  useHotelVerifyOtpMutation,
  useHotelResetPasswordMutation,
  useUpdateHotelUserMutation
} = hotelApiSlice;
