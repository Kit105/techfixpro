import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  // createApi is a function that takes an object with a name and an api object 
// fetchBaseQuery is a function that takes a baseUrl and returns a function that takes a baseQueryArg object with a url and a method    

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Note', 'User'],
    endpoints: (builder) => ({})
});