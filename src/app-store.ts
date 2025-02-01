import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default defineStore("counter", () => {
    const router = useRouter();

    // initial readout as soon as available
    let hasUpdatedOnce = false;
    watch(
        [router.currentRoute],
        () => {
            if (router.currentRoute.value.query ?? null != null) {
                // get the update that first correctly reads the url info

                if (!hasUpdatedOnce) {
                    // initialize from the url only once

                    if (router.currentRoute.value.query.dark ?? undefined) {
                        dark.value = router.currentRoute.value.query.dark === "true";
                    }
                    if (router.currentRoute.value.query.displayTitle ?? undefined) {
                        displayTitle.value = router.currentRoute.value.query.displayTitle === "true";
                    }

                    hasUpdatedOnce = true;
                    updateURLSyncState(true);
                }
            }
        },
        { deep: true }
    );

    const displayTitle = ref(true);
    watch(displayTitle, () => {
        updateURLSyncState(true);
    });
    const dark = ref(true);
    watch(dark, () => {
        updateURLSyncState(true);
    });

    function updateURLSyncState(apply: boolean = true): null | { [key: string]: string } {
        if (hasUpdatedOnce) {
            // the state has once been read from the url. Now it is stored in memory

            const updatedQuery = {
                ...router.currentRoute.value.query,
                displayTitle: displayTitle.value ? "true" : "false",
                dark: dark.value ? "true" : "false",
            };

            if (apply) {
                // change of the internal state has happened. Update the url
                router.push({
                    path: router.currentRoute.value.path,
                    query: updatedQuery,
                });
            } else {
                // navigation was performed, preserve the url
                return updatedQuery;
            }
        }
        return null;
    }

    return {
        displayTitle,
        dark,
        updateURLSyncState,
    };
});
