import {inject} from "vue";

export const TOAST_SYMBOL = Symbol('toast')

export function useToast() {
    return inject(TOAST_SYMBOL)
}