<script>
    import { auth, isPatient, user } from "../../lib/api/firebase";
    import { onMount } from "svelte";
    import PatientDashboard from "$lib/components/PatientDashboard.svelte";
    import ProviderDashboard from "$lib/components/ProviderDashboard.svelte";
    import { goto } from "$app/navigation";
</script>

{#await isPatient()}
    ...
{:then p} 
    {#if p}
        <PatientDashboard />
    {:else}
        <ProviderDashboard />
    {/if}
{/await}