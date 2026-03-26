import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListGroupsQuery = (vsName, queryOps) => useQuery({
    queryKey: ['groups', vsName, queryOps],
    queryFn: () => listGroupsQueryFn(vsName, queryOps),
})

export const listGroupsQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/groups`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useGetGroupQuery = (vsName, groupId) => useQuery({
    queryKey: ['groups', vsName, groupId],
    queryFn: () => getGroupQueryFn(vsName, groupId),
})

export const getGroupQueryFn = async (vsName, groupId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/groups/${groupId}`,
        {
            vsName: vsName,
        }
    )
}

export const useCreateGroupMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createGroupFn(vsName, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['groups', vsName])
        }
    })
}

export const createGroupFn = async (vsName, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/groups`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const usePatchGroupMutation = (vsName, groupId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchGroupFn(vsName, groupId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['groups', vsName, groupId])
            queryClient.invalidateQueries(['groups', vsName])
        }
    })
}

export const patchGroupFn = async (vsName, groupId, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/groups/${groupId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useDeleteGroupMutation = (vsName) => {
    return useMutation({
        mutationFn: (groupId) => deleteGroupFn(vsName, groupId),
    })
}

export const deleteGroupFn = async (vsName, groupId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/groups/${groupId}`,
        {
            method: 'DELETE',
            vsName: vsName,
        }
    )
}
