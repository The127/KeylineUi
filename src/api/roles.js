import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListRolesQuery = (vsName, projectSlug, queryOps) => useQuery({
    queryKey: ['roles', vsName, projectSlug, queryOps],
    queryFn: () => listRolesQueryFn(vsName, projectSlug, queryOps),
})

export const listRolesQueryFn = async (vsName, projectSlug, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/roles`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useCreateRoleMutation = (vsName, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createRoleFn(vsName, projectSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['roles', vsName, projectSlug])
        }
    })
}

export const createRoleFn = async (vsName, projectSlug, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/roles`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}

export const useGetRoleQuery = (vsName, projectSlug, roleId) => useQuery({
    queryKey: ['roles', vsName, projectSlug, roleId],
    queryFn: () => getRoleQueryFn(vsName, projectSlug, roleId),
})

export const getRoleQueryFn = async (vsName, projectSlug, roleId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/roles/${roleId}`,
        {
            vsName: vsName,
        }
    )
}
