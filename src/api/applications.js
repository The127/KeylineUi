import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useListApplicationQuery = (vsName, projectSlug, queryOps) => useQuery({
    queryKey: ['applications', vsName, queryOps],
    queryFn: () => listApplicationQueryFn(vsName, projectSlug, queryOps),
})

export const listApplicationQueryFn = async (vsName, projectSlug, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useGetApplicationQuery = (vsName, projectSlug, applicationId) => useQuery({
    queryKey: ['application', vsName, applicationId],
    queryFn: () => getApplicationQueryFn(vsName, projectSlug, applicationId),
})

export const getApplicationQueryFn = async (vsName, projectSlug, applicationId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications/${applicationId}`,
        {
            vsName: vsName,
        }
    )
}

export const useCreateApplicationMutation = (vsName, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createApplicationMutation(vsName, projectSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['applications'])
        }
    })
}

export const createApplicationMutation = async (vsName, projectSlug, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications`,
    {
            method: 'POST',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const usePatchApplicationMutation = (vsName, projectSlug, applicationId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchApplicationFn(vsName, projectSlug, applicationId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['applications', applicationId])
        }
    })
}

export const patchApplicationFn = async (vsName, projectSlug, applicationId, data) => {
    console.log("patching")
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications/${applicationId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useDeleteApplicationMutation = (vsName, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (applicationId) => deleteApplicationFn(vsName, projectSlug, applicationId),
    })
}

export const deleteApplicationFn = async (vsName, projectSlug, applicationId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications/${applicationId}`,
        {
            method: 'DELETE',
            vsName: vsName,
        }
    )
}

export const useListRolesInApplicationQuery = (vsName, projectSlug, applicationId, queryOps) => useQuery({
    queryKey: ['app-roles', vsName, applicationId, queryOps],
    queryFn: () => listRolesInApplicationFn(vsName, projectSlug, applicationId, queryOps),
})

export const listRolesInApplicationFn = async (vsName, projectSlug, applicationId, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/applications/${applicationId}/roles`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}
