import {inject} from "vue";

export const POPUP_SYMBOL = Symbol('popup')

export function usePopup() {
    return inject(POPUP_SYMBOL)
}