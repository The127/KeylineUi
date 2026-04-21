import {usePopup} from "./popup.js";
import {useToast} from "./toast.js";
import {useRouter} from "vue-router";

export function useDeleteConfirm() {
    const popupService = usePopup()
    const toast = useToast()
    const router = useRouter()

    const confirm = ({title, message, mutation, id, navigateTo, successMessage, errorMessage}) => {
        popupService.confirm({
            title,
            message,
            onConfirm: async () => {
                try {
                    await mutation.mutateAsync(id)
                    if (navigateTo) {
                        await router.push(navigateTo)
                    }
                    toast.success(successMessage || `${title} successful`)
                } catch {
                    toast.error(errorMessage || `Failed to delete`)
                }
            },
        })
    }

    return {confirm}
}
