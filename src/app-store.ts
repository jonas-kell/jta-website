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
                    if (router.currentRoute.value.query.standalone ?? undefined) {
                        standalone.value = router.currentRoute.value.query.standalone === "true";
                    }

                    hasUpdatedOnce = true;
                    updateURLSyncState(true);
                }
            }
        },
        { deep: true }
    );

    const standalone = ref(true);
    watch(standalone, () => {
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
                standalone: standalone.value ? "true" : "false",
                dark: dark.value ? "true" : "false",
            };

            // misuse this function and set the background with js programmatically
            if (!dark.value) {
                document.documentElement.style.background = "none";
            }

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
        standalone,
        dark,
        updateURLSyncState,
    };
});
