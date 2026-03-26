import {reactive, ref, watch} from "vue";
import useVuelidate from "@vuelidate/core";
import {useToast} from "./toast.js";

export function useFormModal({fields, rules, onSubmit, toastMessages}) {
    const modalRef = ref(null)
    const toast = useToast()

    const form = reactive({...fields})
    const v$ = useVuelidate(rules, form)

    const open = (initialValues) => {
        if (initialValues) {
            for (const key of Object.keys(fields)) {
                form[key] = initialValues[key] ?? fields[key]
            }
        } else {
            for (const key of Object.keys(fields)) {
                form[key] = fields[key]
            }
        }
        v$.value.$reset()
        modalRef.value?.open()
    }

    const submit = async () => {
        try {
            await onSubmit(form)
            if (toastMessages?.success) {
                toast.success(toastMessages.success)
            }
            modalRef.value?.close()
        } catch (e) {
            if (toastMessages?.error) {
                toast.error(toastMessages.error)
            }
        }
    }

    const syncFrom = (dataRef) => {
        watch(dataRef, (newData) => {
            if (newData) {
                for (const key of Object.keys(fields)) {
                    if (newData[key] !== undefined) {
                        form[key] = newData[key]
                    }
                }
            }
        })
    }

    return {modalRef, form, v$, open, submit, syncFrom}
}
