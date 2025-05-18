import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        register: builder.mutation({
            query: ({ name, email, pwd, role }) => ({
                url: '/register',
                method: 'POST',
                body: JSON.stringify({ name, email, pwd, role }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // equivalent to withCredentials: true
            }),
        }),


        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} = authApiSlice






