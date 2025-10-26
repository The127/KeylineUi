import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

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