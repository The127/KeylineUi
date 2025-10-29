import {ConfigApiUrl} from "../config.js";
import {apiFetch, applyQueryOps} from "./index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

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

export const useCreateResourceServerMutation = (vsName, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createResourceServerFn(vsName, projectSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects', vsName, projectSlug])
        }
    })
}

export const createResourceServerFn = async (vsName, projectSlug, data) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/projects/${projectSlug}/resource-servers`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            vsName: vsName,
        }
    )
}
