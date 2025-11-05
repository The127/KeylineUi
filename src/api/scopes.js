import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

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