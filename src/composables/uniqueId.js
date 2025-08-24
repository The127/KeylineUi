import {ref} from "vue"

let counter = 0

export function useUniqueId(prefix = "id") {
    return ref(`${prefix}-${counter++}`)
}
