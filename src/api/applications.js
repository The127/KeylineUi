import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {toValue} from "vue";

export const useListApplicationQuery = (vsName, queryOps) => useQuery({
    queryKey: ['applications', vsName, queryOps],
    queryFn: () => listApplicationQueryFn(vsName, queryOps),
})

export const listApplicationQueryFn = async (vsName, queryOps) => {
    const url = new URL(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/applications`
    )

    applyQueryOps(url, queryOps)

    return await apiFetch(url.toString())
}

export const useCreateApplicationMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createApplicationMutation(vsName, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['applications'])
        }
    })
}

export const createApplicationMutation = async (vsName, data) => {
    return await apiFetch(
        `http://127.0.0.1:8081/api/virtual-servers/${vsName}/applications`,
    {
            method: 'POST',
            body: JSON.stringify(data),
        }
    )
}