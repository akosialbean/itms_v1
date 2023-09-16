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
            query: (data) => ({
                url: `${DEVICE_URL}/update`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useAddMutation, useUpdateMutation } = devicesApiSlice