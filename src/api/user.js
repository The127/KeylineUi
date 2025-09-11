import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {apiFetch, applyQueryOps} from "./index.js";

export const useGetUserQuery = (vsName, userId) => useQuery({
    queryKey: ['profile', vsName, userId],
    queryFn: () => getUserQueryFn(vsName, userId),
})

export const getUserQueryFn = async (vsName, userId) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/users/${userId}`
    )
}

export const useUserMutation = (vsName, userId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => userMutationFn(vsName, userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', vsName, userId])
        }
    })
}

export const userMutationFn = async (vsName, userId, data) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/users/${userId}`,
    {
            method: 'PATCH',
            body: JSON.stringify(data),
        }
    )
}

export const useListUsersQuery = (vsName, queryOps) => useQuery({
    queryKey: ['users', vsName, queryOps],
    queryFn: () => listUsersQueryFn(vsName, queryOps),
})

export const listUsersQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/users`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}