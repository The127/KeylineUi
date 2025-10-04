import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useListApplicationQuery = (vsName, queryOps) => useQuery({
    queryKey: ['applications', vsName, queryOps],
    queryFn: () => listApplicationQueryFn(vsName, queryOps),
})

export const listApplicationQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}

export const useGetApplicationQuery = (vsName, applicationId) => useQuery({
    queryKey: ['application', vsName, applicationId],
    queryFn: () => getApplicationQueryFn(vsName, applicationId),
})

export const getApplicationQueryFn = async (vsName, applicationId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications/${applicationId}`
    )
}

export const useCreateApplicationMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createApplicationMutation(vsName, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['applications'])
        }
    })
}

export const createApplicationMutation = async (vsName, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications`,
    {
            method: 'POST',
            body: JSON.stringify(data),
        }
    )
}