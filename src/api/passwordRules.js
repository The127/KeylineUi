import {apiFetch} from "./index.js";
import {useQuery} from "@tanstack/vue-query";
import {ConfigApiUrl} from "../config.js";

export const useListPasswordRulesQuery = (vsName) => useQuery({
    queryKey: ['password-rules', vsName],
    queryFn: () => listPasswordRulesQueryFn(vsName),
})

export const listPasswordRulesQueryFn = async (vsName) => {
    return await apiFetch(ConfigApiUrl() + `/api/virtual-servers/${vsName}/password-policies/rules`, {
        vsName: vsName,
    })
}