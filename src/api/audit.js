import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListAuditLogsQuery = (vsName, queryOps) => useQuery({
    queryKey: ['audit', vsName, queryOps],
    queryFn: () => listAuditLogsQueryFn(vsName, queryOps),
})

export const listAuditLogsQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/audit`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}