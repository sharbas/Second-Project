import { apiSlice } from "./apiSlice.js"

const ADMINS_URL = "/api/admin";

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    adminLogin: builders.mutation({
      query: (data) => ({
        
        url: `${ADMINS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    loadHotelUsers: builders.mutation({
      query: (data) => ({
        
        url: `${ADMINS_URL}/loadHotelUsers`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builders.mutation({
      query: () => ({
        url: `${ADMINS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});


export const {useAdminLoginMutation,useLogoutMutation,useLoadHotelUsersMutation} = adminsApiSlice;
