import { apiSlice } from "./apiSlice"
const DEVICE_URL = '/api/devices'

export const devicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        add: builder.mutation({
            query: (data) => ({
                url: `${DEVICE_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        update: builder.mutation({
            query: ({id, updateData}) => ({
                url: `${DEVICE_URL}/device/update/${id}`,
                method: 'PATCH',
                body: updateData
            })
        }),
        search: builder.mutation({
            query: ({id, searchItem}) => ({
                url: `${DEVICE_URL}/device/search`,
                method: 'POST',
                body: searchItem
            })
        })
    })
})

export const { useAddMutation, useUpdateMutation, useSearchMutation } = devicesApiSlice