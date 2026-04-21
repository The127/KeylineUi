import {reactive, ref, watch} from "vue";
import useVuelidate from "@vuelidate/core";
import {useToast} from "./toast.js";

export function useFormModal({fields, rules, onSubmit, toastMessages}) {
    const modalRef = ref(null)
    const toast = useToast()

    const form = reactive({...fields})
    const vuelidateRef = useVuelidate(rules, form)

    // Expose vuelidate as a reactive proxy so template access like
    // `modal.validation.name.$model` works without `.value`
    const validation = new Proxy({}, {
        get(_, prop) {
            return vuelidateRef.value[prop]
        }
    })

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
        vuelidateRef.value.$reset()
        modalRef.value?.open()
    }

    const submit = async () => {
        try {
            await onSubmit(form)
            if (toastMessages?.success) {
                toast.success(toastMessages.success)
            }
            modalRef.value?.close()
        } catch {
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

    return {modalRef, form, validation, vuelidateRef, open, submit, syncFrom}
}
