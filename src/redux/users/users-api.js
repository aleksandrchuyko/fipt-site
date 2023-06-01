import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { BASE_URL } from 'constants';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Users'],
  endpoints(build) {
    return {
      getAllUsers: build.query({
        query: () => ({ url: 'users', method: 'get' }),
        providesTags: ['Users'],
      }),
      getById: build.query({
        query: (userId) => ({ url: `users/${userId}`, method: 'get' }),
        providesTags: ['Users'],
      }),
      addUser: build.mutation({
        query: ({ name, email, password }) => ({
          url: 'users',
          method: 'post',
          data: {
            name,
            email,
            password,
          },
        }),
        invalidatesTags: ['Users'],
      }),
      removeUser: build.mutation({
        query: userId => ({
          url: `users/${userId}`,
          method: 'delete',
        }),
        invalidatesTags: ['Users'],
      }),
      updateUser: build.mutation({
        query: ({ userId, name, email, password }) => ({
          url: `users/${userId}`,
          method: 'put',
          data: {
            name,
            email,
            password,
          },
        }),
        invalidatesTags: ['Users'],
      }),
    };
  },
});

export const {
  useGetAllUsersQuery,
  useGetByIdQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = usersApi;
