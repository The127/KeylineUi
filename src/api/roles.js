import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListRolesQuery = (vsName, queryOps) => useQuery({
    queryKey: ['roles', vsName, queryOps],
    queryFn: () => listRolesQueryFn(vsName, queryOps),
})

export const listRolesQueryFn = async(vsName, queryOps) => {
    const url = new URL(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/roles`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}