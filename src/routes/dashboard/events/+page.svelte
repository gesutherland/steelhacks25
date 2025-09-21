<script>
    import { goto } from "$app/navigation";
    import { db, getDoctorEmailFromID, getPatientNameFromID, getUser, isPatient } from "$lib/api/firebase";
    import Navbar from "$lib/components/Navbar.svelte";
    import {
    addDoc,
        collection,
        doc,
        getDoc,
        getDocs,
        onSnapshot,
        setDoc,
        Timestamp,
        updateDoc,
    } from "firebase/firestore";
    import { onMount } from "svelte";

    let events = [];

    let typingMedicalEventVal = "";

    // ik this is a bad variable name idk
    const doesUserHaveDoc = async (userId, docEmail) => {
        let d = await getDoc(doc(db, "medical-profile", userId))
        if (!d.exists()) return false;
        return (d.data().providers || []).includes(docEmail);
    }
    
    const sendMedicalEvent = async () => {
        let u = await getUser();

        addDoc(collection(db, "medical-events"), {
            uid: u.uid,
            desc: typingMedicalEventVal,
            time: Timestamp.fromDate(new Date())
        })

        typingMedicalEventVal = "";
    }

    onMount(async () => {
        onSnapshot(collection(db, "medical-events"), (x) => {
            events = [];
            x.forEach((y) => {
                events = [...events, y.data()];
            });
        });
    });
</script>

<Navbar />

{#await Promise.all([isPatient(), getUser()])}
    ...
{:then [p, u]}
    {#if p}
        <div class="p-4 flex flex-col gap-20 items-center overflow-y-scroll">
            <div class="bg-[#E6F2F7] rounded-lg p-6 w-full max-w-2xl mx-auto">
                <textarea
                    placeholder="A description of your medical event..."
                    class="w-full h-52 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2"
                    bind:value={typingMedicalEventVal}
                ></textarea>

                <div class="flex justify-between items-center mt-4">
                    <button
                        class="bg-[#70A0B6] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#5a8a9e] transition-colors"
                        on:click={sendMedicalEvent}
                    >
                        Send Message
                    </button>
                </div>
            </div>
            {#each events.filter((x) => x.uid == u.uid) as event}
                <div
                    class="w-[800px] font-sans bg-[#FFFFFF] text-white bg-opacity-70 rounded-lg border border-slate-300 shadow-lg"
                >
                    <div class="flex justify-between p-2 m-2">
                        <div class="font-normal text-[#4e7181] text-xl">
                            {new Date(event.time.seconds*1000).toLocaleString()}
                        </div>
                    </div>
                    <div class="bg-blue-100 w-full h-64 text-[#286480] p-6">
                        {event.desc}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <h1
            class="flex justify-start font-semibold text-5xl text-[#286480] p-4 pb-6"
        >
            Patient Medical Events
        </h1>
        <div class="flex flex-col items-center gap-7">
            {#each events as event}
            {#await getDoctorEmailFromID(u.uid).then(docEmail => doesUserHaveDoc(event.uid, docEmail))}
                ...
            {:then show} 
                {#if show}
                    
                <div
                    class="w-[800px] font-sans bg-[#FFFFFF] text-white bg-opacity-70 rounded-lg border border-slate-300 shadow-lg"
                >
                    <div class="flex justify-between p-4 m-4">
                        <div class="font-semibold text-[#286480] text-2xl">
                            {#await getPatientNameFromID(event.uid)}
                                ...
                            {:then name}
                                <h1>{name}</h1>
                            {/await}
                        </div>
                        <div class="flex gap-4">
                            <button
                                on:click={() =>
                                    goto(
                                        `/dashboard/communication/${event.uid}/chat`,
                                    )}
                                class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                            >
                                Chat
                            </button>
                            <button
                                on:click={() =>
                                    goto(
                                        `/dashboard/communication/${event.uid}/profile`,
                                    )}
                                class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer"
                            >
                                See Info
                            </button>
                        </div>
                    </div>
                    <div class="bg-blue-100 w-full h-64 text-[#286480] p-6">
                        {event.desc}
                    </div>
                </div>
                {/if}
            {/await}
            {/each}
        </div>
    {/if}
{/await}
