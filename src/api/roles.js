import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useListRolesQuery = (vsName, queryOps) => useQuery({
    queryKey: ['roles', vsName, queryOps],
    queryFn: () => listRolesQueryFn(vsName, queryOps),
})

export const listRolesQueryFn = async(vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/roles`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}

export const useGetRoleQuery = (vsName, roleId) => useQuery({
    queryKey: ['role', vsName, roleId],
    queryFn: () => getRoleQueryFn(vsName, roleId),
})

export const getRoleQueryFn = async(vsName, roleId) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/roles/${roleId}`
    )
}

export const useListUsersInRoleQuey = (vsName, roleId, queryOps) => useQuery({
    queryKey: ['users-in-role', vsName, roleId],
    queryFn: () => listUsersInRoleQueryFn(vsName, roleId, queryOps),
})

export const listUsersInRoleQueryFn = async(vsName, roleId, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/roles/${roleId}/users`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}