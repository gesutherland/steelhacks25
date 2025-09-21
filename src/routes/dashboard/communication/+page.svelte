<script>
    import { goto } from "$app/navigation";
    import { getUser, isPatient } from "$lib/api/firebase";
    import { onMount } from "svelte";

    let patients = [];

    onMount(async () => {
        await getUser();
        if (isPatient()) {
            goto("/dashboard");
        }

    })
</script>

{#each patients as patient}
    <div>patient.email</div>
{/each}