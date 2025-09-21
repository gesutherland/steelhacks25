<script>
    import { goto } from "$app/navigation";
    import { db, getUser, isPatient } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import { arrayUnion, collection, doc, query, updateDoc, where, setDoc, getDoc } from "firebase/firestore";

    let patients = [];
    let providers = [];
    
    let newProviderEmail;

    const addNewProvider = async () => { 
        let u = await getUser();
        const medProfRef = doc(db, "medical-profile", u.uid);

        await setDoc(medProfRef, {
            providers: arrayUnion(newProviderEmail)
        }, { merge: true });

        newProviderEmail = "";

        updateArrays();
    }

    const updateArrays = async () => {
        let u = await getUser();
        if (isPatient()) {
            let data = await getDoc(doc(db, "medical-profile", u.uid));
            providers = data.data().providers;
        } else {

        }
    }

    onMount(async () => {
        let u = await getUser();

        const medProfRef = collection(db, "users");

        updateArrays();
    })
</script>

{#if isPatient()}
    {#each providers as provider}
        <div>{provider}</div>
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