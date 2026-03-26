import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListScopesQuery = (vsName, projectSlug, resourceServerId, queryOps) => useQuery({
    queryKey: ['scopes', vsName, projectSlug, resourceServerId, queryOps],
    queryFn: () => listScopesQueryFn(vsName, projectSlug, resourceServerId, queryOps),
})

export const listScopesQueryFn = async (vsName, projectSlug, resourceServerId, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}/scopes`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useGetScopeQuery = (vsName, projectSlug, resourceServerId, scopeId) => useQuery({
    queryKey: ['scopes', vsName, projectSlug, resourceServerId, scopeId],
    queryFn: () => getScopeQueryFn(vsName, projectSlug, resourceServerId, scopeId),
})

export const getScopeQueryFn = async (vsName, projectSlug, resourceServerId, scopeId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}/scopes/${scopeId}`,
        {
            vsName: vsName,
        }
    )
}

export const usePatchScopeMutation = (vsName, projectSlug, resourceServerId, scopeId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchScopeFn(vsName, projectSlug, resourceServerId, scopeId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['scopes', vsName, projectSlug, resourceServerId, scopeId])
            queryClient.invalidateQueries(['scopes', vsName, projectSlug, resourceServerId])
        }
    })
}

export const patchScopeFn = async (vsName, projectSlug, resourceServerId, scopeId, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}/scopes/${scopeId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useDeleteScopeMutation = (vsName, projectSlug, resourceServerId) => {
    return useMutation({
        mutationFn: (scopeId) => deleteScopeFn(vsName, projectSlug, resourceServerId, scopeId),
    })
}

export const deleteScopeFn = async (vsName, projectSlug, resourceServerId, scopeId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}/scopes/${scopeId}`,
        {
            method: 'DELETE',
            vsName: vsName,
        }
    )
}
