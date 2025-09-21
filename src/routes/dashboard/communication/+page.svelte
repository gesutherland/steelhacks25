<script>
    import { goto } from "$app/navigation";
    import { db, getUser, isPatient } from "../../../lib/api/firebase";
    import { onMount } from "svelte";
    import { arrayUnion, collection, doc, query, updateDoc, where, setDoc, getDoc, getDocs } from "firebase/firestore";

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
        if (await isPatient()) {
            let data = await getDoc(doc(db, "medical-profile", u.uid));
            providers = data.data().providers;
        } else {
            let usersRef = collection(db, "medical-profile");

            getDoc(doc(db, "users", u.uid)).then(async docSnap => {
                console.log(docSnap.data().email);
                const q = query(usersRef, where("providers", "array-contains", docSnap.data().email));
                let docs = await getDocs(q);
                console.log(docs);
                docs.forEach(x => {
                    patients.push(x.id);
                    patients = patients;
                })
            });
        }
    }

    onMount(async () => {
        updateArrays();
    })
</script>

{#await isPatient()}
    ...
{:then p} 
    {#if p}
        {#each providers as provider}
            <div>{provider}</div>
        {/each}

        <div>
            <input type="email" placeholder="doctor.email@pitt.edu" bind:value={newProviderEmail} />
            <button on:click={addNewProvider}>New Provider</button>
        </div>
    {:else}
        {#each patients as patient}
            <div>{patient}</div>
        {/each}
    {/if}
{/await}