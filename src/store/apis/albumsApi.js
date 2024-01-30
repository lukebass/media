import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => ({ type: 'Album', id: album.id }));
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },
                query: (user) => ({
                    url: 'albums',
                    method: 'GET',
                    params: {
                        userId: user.id
                    }
                })
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, { user }) => [{ 
                    type: 'UsersAlbums', 
                    id: user.id 
                }],
                query: ({ user, title }) => ({
                    url: 'albums',
                    method: 'POST',
                    body: {
                        userId: user.id,
                        title
                    }
                })
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => [{ 
                    type: 'Album', 
                    id: album.id 
                }],
                query: (album) => ({
                    url: `albums/${album.id}`,
                    method: 'DELETE'
                })
            })
        }
    }
});

export const { 
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} = albumsApi;