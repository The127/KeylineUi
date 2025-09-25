import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListTemplatesQuery = (vsName, queryOps) => useQuery({
    queryKey: ['templates', vsName, queryOps],
    queryFn: () => listTemplatesQueryFn(vsName, queryOps)
})

export const listTemplatesQueryFn = async(vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/templates`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}