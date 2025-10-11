import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

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