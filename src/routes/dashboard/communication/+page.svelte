<script>
    import { goto } from "$app/navigation";
    import { db, getUser, isPatient } from "../../../lib/api/firebase";
    import { onMount } from "svelte";
    import {
        arrayUnion,
        collection,
        doc,
        query,
        updateDoc,
        where,
        setDoc,
        getDoc,
        getDocs,
    } from "firebase/firestore";
    import Navbar from "$lib/components/Navbar.svelte";

    let patients = [];
    let providers = [];

    let newProviderEmail;

    const addNewProvider = async () => {
        let u = await getUser();
        const medProfRef = doc(db, "medical-profile", u.uid);

        await setDoc(
            medProfRef,
            {
                providers: arrayUnion(newProviderEmail),
            },
            { merge: true },
        );

        newProviderEmail = "";

        updateArrays();
    };

    const updateArrays = async () => {
        let u = await getUser();

        if (await isPatient()) {
            providers = [];
            let usersRef = collection(db, "users");
            let data = await getDoc(doc(db, "medical-profile", u.uid));
            data.data().providers.map(async (x) => {
                const q = query(usersRef, where("email", "==", x));
                let docs = await getDocs(q);
                docs.forEach((y) => {
                    providers = [...providers, {id: y.id, email: x}];
                });
            });
            providers = providers;
        } else {
            patients = [];
            let usersRef = collection(db, "medical-profile");
            getDoc(doc(db, "users", u.uid)).then(async (docSnap) => {
                const q = query(
                    usersRef,
                    where("providers", "array-contains", docSnap.data().email),
                );
                let docs = await getDocs(q);
                docs.forEach((x) => {
                    patients = [...patients, x.id];
                });
            });
            patients = patients;
        }
    };

    onMount(async () => {
        updateArrays();
    });
</script>

<div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-grow">
        {#await isPatient()}
            <p>Loading...</p>
        {:then p}
            {#if p}
                <div>
                    <h1
                        class="flex justify-start font-semibold text-5xl text-[#286480] px-4 py-3"
                    >
                        Your Healthcare Providers 
                    </h1>
                    {#each providers as provider}
                        <div
                            class="flex justify-between font-sans bg-[#FFFFFF] text-white bg-opacity-70 rounded-lg border border-slate-300 shadow-lg p-6 m-4 w-3/4 max-w-4xl"
                        >
                            <div class="font-semibold text-[#286480] text-2xl">
                                <h1>{provider.email}</h1>
                            </div>
                            <div class="flex gap-4">
                                <button
                                    on:click={() =>
                                        goto(
                                            `/dashboard/communication/${provider.id}/chat`,
                                        )}
                                    class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                                >
                                    Chat
                                </button>
                                <button
                                    on:click={() =>
                                        goto(
                                            `/dashboard/communication/${provider.id}/profile`,
                                        )}
                                    class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                                >
                                    See Profile
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>

                <div>
                    <div
                        class="flex justify-between font-sans bg-[#FFFFFF] text-white bg-opacity-70 rounded-lg border border-slate-300 shadow-lg p-6 m-4 w-3/4 max-w-4xl"
                    >
                        <div class="font-semibold text-[#286480] text-2xl">
                            <input
                                type="email"
                                placeholder="doctor.email@pitt.edu"
                                bind:value={newProviderEmail}
                            />
                        </div>
                        <div class="flex gap-4">
                            <button
                                on:click={addNewProvider}
                                class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                            >
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            {:else}
                {#each patients as patient}
                    <div>
                        <h1
                            class="flex justify-start font-semibold text-5xl text-[#286480] px-4 py-3"
                        >
                            Patients
                        </h1>
                        <div
                            class="flex justify-between font-sans bg-[#FFFFFF] text-white bg-opacity-70 rounded-lg border border-slate-300 shadow-lg p-6 m-4 w-3/4 max-w-4xl"
                        >
                            <div class="font-semibold text-[#286480] text-2xl">
                                <h1>Evany Rodriguez</h1>
                            </div>
                            <div class="flex gap-4">
                                <button
                                    on:click={() =>
                                        goto(
                                            `/dashboard/communication/${patient}/chat`,
                                        )}
                                    class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                                >
                                    Chat
                                </button>
                                <button
                                    on:click={() =>
                                        goto(
                                            `/dashboard/communication/${patient}/profile`,
                                        )}
                                    class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                                >
                                    See Info
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        {/await}
    </main>
</div>
