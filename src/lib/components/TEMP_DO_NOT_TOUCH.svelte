<script>
    import { getUser, isPatient, selectedPatient } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import LeftDashboardNavElement from "./DashboardNavElement.svelte";
    import LogoutButton from "./LogoutButton.svelte";

    let selectPat;
    let patients;

    export let selectedNavElement = null;

    const onNavClick = (path) => {
        selectedNavElement = path;
        console.log(selectedNavElement);
    }

    onMount(async () => {
        await getUser();

    });

    selectedPatient.set(selectPat) & console.log($selectedPatient);
</script>

<div class="flex flex-col w-64 h-full">
    {#if !isPatient()}
        <select bind:value={selectPat}>
            {#each patients as patient}
                <option value={patient.uid}>{patient.email}</option>
            {/each}
        </select>
    {/if}
    

    <LogoutButton />
</div>