import {apiFetch} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useGetVirtualServerQuery = (vsName) => useQuery({
    queryKey: ['virtualServer', vsName],
    queryFn: () => getVirtualServerQueryFn(vsName),
})

export const getVirtualServerQueryFn = async (vsName) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}`, {
            vsName: vsName,
        }
    )
}

export const usePatchVirtualServerMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchVirtualServerFn(vsName, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['virtualServer', vsName])
        }
    })
}

export const patchVirtualServerFn = async (vsName, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}