<script>
    import { goto } from "$app/navigation";
    import { auth } from "$lib/api/firebase";
    import { onMount } from "svelte";

    onMount(async () => {
        let unsub = auth.onAuthStateChanged(u => {
            if (!u) {
                goto("/login");
                unsub();
            }
        })
    })
</script>

<slot></slot>