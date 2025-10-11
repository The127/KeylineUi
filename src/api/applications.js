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

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useGetApplicationQuery = (vsName, applicationId) => useQuery({
    queryKey: ['application', vsName, applicationId],
    queryFn: () => getApplicationQueryFn(vsName, applicationId),
})

export const getApplicationQueryFn = async (vsName, applicationId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications/${applicationId}`,
        {
            vsName: vsName,
        }
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
            vsName: vsName,
        }
    )
}

export const usePatchApplicationMutation = (vsName, applicationId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchApplicationFn(vsName, applicationId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['applications', applicationId])
        }
    })
}

export const patchApplicationFn = async (vsName, applicationId, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications/${applicationId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useDeleteApplicationMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (applicationId) => deleteApplicationFn(vsName, applicationId),
    })
}

export const deleteApplicationFn = async (vsName, applicationId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications/${applicationId}`,
        {
            method: 'DELETE',
            vsName: vsName,
        }
    )
}

export const useListRolesInApplicationQuery = (vsName, applicationId, queryOps) => useQuery({
    queryKey: ['app-roles', vsName, applicationId, queryOps],
    queryFn: () => listRolesInApplicationFn(vsName, applicationId, queryOps),
})

export const listRolesInApplicationFn = async (vsName, applicationId, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/applications/${applicationId}/roles`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}
