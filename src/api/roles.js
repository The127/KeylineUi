import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

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