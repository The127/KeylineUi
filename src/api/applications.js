import {apiFetch} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListApplicationQuery = (vsName, pagination) => useQuery({
    queryKey: ['applications'],
    queryFn: () => listApplicationQueryFn(vsName, pagination),
})

export const listApplicationQueryFn = async (vsName, pagination) => {
    const url = new URL(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/applications`
    )

    if (!!pagination) {
        url.searchParams.append('page', pagination.page ?? 1)
        url.searchParams.append('pageSize', pagination.pageSize ?? 10)
    }

    return await apiFetch(url.toString())
}