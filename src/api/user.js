import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {apiFetch} from "./index.js";

export const useProfileQuery = (vsName, userId) => useQuery({
    queryKey: ['profile', vsName, userId],
    queryFn: () => profileQueryFn(vsName, userId),
})

export const profileQueryFn = async (vsName, userId) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/users/${userId}`
    )
}

export const useProfileMutation = (vsName, userId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => profileMutationFn(vsName, userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', vsName, userId])
        }
    })
}

export const profileMutationFn = async (vsName, userId, data) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/users/${userId}`,
    {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}