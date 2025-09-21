<script>
    import { goto } from "$app/navigation";
    import { db, getUser, isPatient } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import { collection, query, updateDoc, where } from "firebase/firestore";

    let patients = [];
    let providers = [];
    
    let newProviderEmail;

    const addNewProvider = async () => {
        const medProfRef = collection(db, "medical-profile");

        await updateDoc(medProfRef, {
            providers: arrayUnion(newProviderEmail)
        });

        newProviderEmail = "";
    }

    onMount(async () => {
        await getUser();

        const medProfRef = collection(db, "medical-profile");

        if (isPatient()) {
            
        } else {

        }
    })
</script>

{#if isPatient()}
    {#each providers as provider}
        <div>{provider.email}</div>
    {/each}

    <div>
        <input type="email" placeholder="doctor.email@pitt.edu" bind:value={newProviderEmail} />
        <button on:click={addNewProvider}>New Provider</button>
    </div>
{:else}
    {#each patients as patient}
        <div>{patient.email}</div>
    {/each}
{/if}