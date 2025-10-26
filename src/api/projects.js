import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListProjectsQuery = (vsName, queryOps) => useQuery({
    queryKey: ['projects', vsName, queryOps],
    queryFn: () => listProjectsQueryFn(vsName, queryOps),
})

export const listProjectsQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}