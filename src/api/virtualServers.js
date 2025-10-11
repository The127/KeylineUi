import {apiFetch} from "./index.js";
import {useQuery} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useGetVirtualServerQuery = (vsName) => useQuery({
    queryKey: ['virtualServer', vsName],
    queryFn: () => getVirtualServerQueryFn(vsName),
})

export const getVirtualServerQueryFn = async (vsName) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}`, {
            vsName: vsName,
        }
    )
}