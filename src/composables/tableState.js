import { ref, watch } from "vue";

export function useTableState(tableKey, defaults = {}) {
    const state = ref(defaults);

    if (tableKey) {
        const storageKey = "table-state-" + tableKey;
        const stored = localStorage.getItem(storageKey);

        if (stored) {
            try {
                state.value = JSON.parse(stored);
            } catch {
                // fallback if corrupted JSON
                state.value = defaults;
            }
        }

        watch(
            state,
            (newVal) => {
                localStorage.setItem(storageKey, JSON.stringify(newVal));
            },
            { deep: true }
        );
    }

    return state;
}
