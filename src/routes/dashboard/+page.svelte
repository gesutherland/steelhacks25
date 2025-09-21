<script>
    import { auth, isPatient, user } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import { userType } from "$lib/api/firebase";
    import PatientDashboard from "$lib/components/PatientDashboard.svelte";
    import ProviderDashboard from "$lib/components/ProviderDashboard.svelte";
    import { goto } from "$app/navigation";
    import LogoutButton from "$lib/components/LogoutButton.svelte";
</script>

{#if isPatient()}
    <PatientDashboard />
{:else}
    <ProviderDashboard />
{/if}

<LogoutButton></LogoutButton>