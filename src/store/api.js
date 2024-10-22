import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'http://localhost:5173'; // to test locally for now till we get the server up and running.

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            token && headers.set("authorization", `Bearer ${token}`);
            token && headers.set("content-type", 'application/json');
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["department"], // we still need to add other tags here as we build
});

export default api;