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

    return await apiFetch(url.toString(), {
        vsName: vsName,
    })
}

export const useGetTemplateQuery = (vsName, templateType) => useQuery({
    queryKey: ['template', vsName, templateType],
    queryFn: () => getTemplateQueryFn(vsName, templateType)
})

export const getTemplateQueryFn = async(vsName, templateType) => {
    return await apiFetch(ConfigApiUrl() + `/api/virtual-servers/${vsName}/templates/${templateType}`, {
        vsName: vsName,
    })
}