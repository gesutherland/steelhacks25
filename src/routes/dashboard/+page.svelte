<script>
    import { auth, user } from "$lib/api/firebase";
    import LeftDashboardNav from "$lib/components/TEMP_DO_NOT_TOUCH.svelte";
    import { onMount } from "svelte";
    import { userType } from "$lib/api/firebase";
    import PatientDashboard from "$lib/components/PatientDashboard.svelte";
    import ProviderDashboard from "$lib/components/ProviderDashboard.svelte";
    import { goto } from "$app/navigation";

    onMount(async () => {
        let unsub = auth.onAuthStateChanged(u => {
            if (!u) {
                goto("/login");
                unsub();
            }
        })
    })
</script>

{#if $userType == "patients"}
    <PatientDashboard />
{:else}
    <ProviderDashboard />
{/if}