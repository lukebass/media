import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
    endpoints(builder) {
        return {
            fetchUsers: builder.query({
                providesTags: () => [{ type: 'Users' }],
                query: () => ({
                    url: 'users',
                    method: 'GET'
                })
            }),
            addUser: builder.mutation({
                invalidatesTags: () => [{ type: 'Users' }],
                query: (name) => ({
                    url: 'users',
                    method: 'POST',
                    body: { name }
                })
            }),
            removeUser: builder.mutation({
                invalidatesTags: () => [{ type: 'Users' }],
                query: (user) => ({
                    url: `users/${user.id}`,
                    method: 'DELETE'
                })
            })
        }
    }
});

export const { 
    useFetchUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation
} = usersApi;