import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {apiFetch, applyQueryOps} from "./index.js";
import {ConfigApiUrl} from "../config.js";

export const useGetUserQuery = (vsName, userId) => useQuery({
    queryKey: ['profile', vsName, userId],
    queryFn: () => getUserQueryFn(vsName, userId),
})

export const getUserQueryFn = async (vsName, userId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/users/${userId}`, {
            vsName: vsName,
        }
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
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/users/${userId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useChangeOwnPasswordMutation = (vsName, userId) => {
    return useMutation({
        mutationFn: (data) => changeOwnPasswordFn(vsName, userId, data),
    })
}

export const changeOwnPasswordFn = async (vsName, userId, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/users/${userId}/change-password`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useAdminResetPasswordMutation = (vsName) => {
    return useMutation({
        mutationFn: ({userId, password, temporary}) => adminResetPasswordFn(vsName, userId, password, temporary),
    })
}

export const adminResetPasswordFn = async (vsName, userId, password, temporary) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/users/${userId}`,
        {
            method: 'PATCH',
            body: JSON.stringify({password: {plain: password, temporary: temporary || false}}),
            vsName: vsName,
        }
    )
}

export const useListUsersQuery = (vsName, queryOps) => useQuery({
    queryKey: ['users', vsName, queryOps],
    queryFn: () => listUsersQueryFn(vsName, queryOps),
})

export const listUsersQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/users`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}