import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListResourceServersQuery = (vsName, projectsSlug, queryOps) => useQuery({
    queryKey: ['resource-servers', vsName, projectsSlug, queryOps],
    queryFn: () => listResourceServersQueryFn(vsName, projectsSlug, queryOps),
})

export const listResourceServersQueryFn = async (vsName, projectSlug, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useCreateResourceServerMutation = (vsName, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createResourceServerFn(vsName, projectSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects', vsName, projectSlug])
        }
    })
}

export const createResourceServerFn = async (vsName, projectSlug, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useGetResourceServerQuery = (vsName, projectSlug, resourceServerId) => useQuery({
    queryKey: ['resource-servers', vsName, projectSlug, resourceServerId],
    queryFn: () => getResourceServerQueryFn(vsName, projectSlug, resourceServerId),
})

export const getResourceServerQueryFn = async (vsName, projectSlug, resourceServerId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}`,
        {
            vsName: vsName,
        }
    )
}

export const usePatchResourceServerMutation = (vsName, projectSlug, resourceServerId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchResourceServerFn(vsName, projectSlug, resourceServerId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['resource-servers', vsName, projectSlug, resourceServerId])
            queryClient.invalidateQueries(['resource-servers', vsName, projectSlug])
        }
    })
}

export const patchResourceServerFn = async (vsName, projectSlug, resourceServerId, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useDeleteResourceServerMutation = (vsName, projectSlug) => {
    return useMutation({
        mutationFn: (resourceServerId) => deleteResourceServerFn(vsName, projectSlug, resourceServerId),
    })
}

export const deleteResourceServerFn = async (vsName, projectSlug, resourceServerId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers/${resourceServerId}`,
        {
            method: 'DELETE',
            vsName: vsName,
        }
    )
}
