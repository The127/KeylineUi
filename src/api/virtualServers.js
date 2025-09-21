import {apiFetch} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useGetVirtualServerQuery = (vsName) => useQuery({
    queryKey: ['virtualServer', vsName],
    queryFn: () => getVirtualServerQueryFn(vsName),
})

export const getVirtualServerQueryFn = async (vsName) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}`
    )
}