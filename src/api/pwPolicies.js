import {ConfigApiUrl} from "../config.js";
import {apiFetch} from "./index.js";
import {useMutation, useQueryClient} from "@tanstack/vue-query";

export const useCreatePwPolicyRuleMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ruleType, details}) => createPwPolicyRuleFn(vsName, ruleType, details),
        onSuccess: () => {
            queryClient.invalidateQueries(['password-rules', vsName])
        }
    })
}

const createPwPolicyRuleFn = async (vsName, ruleType, details) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/password-policies/rules/${ruleType}`,
        {
            method: 'POST',
            body: JSON.stringify(details),
            vsName: vsName,
        }
    )
}

export const useUpdatePwPolicyRuleMutation = (vsName) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ruleType, details}) => updatePwPolicyRuleFn(vsName, ruleType, details),
        onSuccess: () => {
            queryClient.invalidateQueries(['password-rules', vsName])
        }
    })
}

const updatePwPolicyRuleFn = async (vsName, ruleType, details) => {
    return await apiFetch(
        ConfigApiUrl() + `/api/virtual-servers/${vsName}/password-policies/rules/${ruleType}`,
        {
            method: 'PUT',
            body: JSON.stringify(details),
            vsName: vsName,
        }
    )
}
