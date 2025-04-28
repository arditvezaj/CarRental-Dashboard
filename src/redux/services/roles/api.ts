import {apiSlice} from '@/redux/services/api-slice'

export const api = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoles: builder.query({
            query: () => '/roles',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({id}: {id: number}) => ({
                              type: 'Roles',
                              id
                          })),
                          {type: 'Roles', id: 'LIST'}
                      ]
                    : [{type: 'Roles', id: 'LIST'}]
        }),
        createRole: builder.mutation({
            query: body => ({
                url: '/roles',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Roles', id: 'LIST'}]
        }),
        getRole: builder.query({
            query: id => ({url: `/roles/${id}`}),
            providesTags: (result, error, id) => [{type: 'Roles', id}]
        }),
        updateRole: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/roles/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Roles', id}]
        }),
        deleteRole: builder.mutation({
            query: id => ({
                url: `/roles/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Roles', id: 'LIST'}]
        })
    })
})

export const {
    useGetRolesQuery,
    useCreateRoleMutation,
    useGetRoleQuery,
    useLazyGetRoleQuery,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} = api
