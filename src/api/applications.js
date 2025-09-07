import {apiFetch} from "./index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListApplicationQuery = (vsName) => useQuery({
    queryKey: ['applications'],
    queryFn: () => listApplicationQueryFn(vsName),
})

export const listApplicationQueryFn = async (vsName) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/applications`
    )
}