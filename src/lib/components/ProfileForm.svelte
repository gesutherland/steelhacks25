<script>
    import { db, getUser, sendPatientInfo } from "$lib/api/firebase";
    import { isPatient } from "$lib/api/firebase";

    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
    import { page } from "$app/stores";

    // A single object to hold all the form data
    let formData = {
        personal: {
            firstName: "",
            middleInitial: "",
            lastName: "",
            dob: "",
            gender: "Unspecified",
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            email: "",
            phone: "",
        },
        emergency: {
            firstName: "",
            lastName: "",
            relationship: "Unspecified",
            email: "",
            phone: "",
        },
        insurance: {
            provider: "",
            groupNumber: "",
        },
        medications: [{ id: 1, name: "", dosage: "" }],
        allergies: [{ id: 1, allergy: "", severity: "Unspecified" }],
        medicalHistory: "",
    };

    function addMedication() {
        formData.medications = [
            ...formData.medications,
            { id: Date.now(), name: "", dosage: "" },
        ];
    }

    function addAllergy() {
        formData.allergies = [
            ...formData.allergies,
            { id: Date.now(), allergy: "", severity: "Unspecified" },
        ];
    }

    const downloadInfo = () => {
        var blob = new Blob([JSON.stringify(formData)], { type: "json" });
        var a = document.createElement('a');

        a.download = "OurChart_" + formData.personal.firstName + formData.personal.lastName + "_" + new Date().toLocaleDateString("en-US") + ".json";
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ["json", a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(a.href), 300);
    }

    const saveInfo = async () => {
        let u = await getUser();
        let ut = await isPatient();
        updateDoc(doc(db, "medical-profile", ut ? u.uid : $page.params.slug), {form: formData})
    }

    onMount(async() => {
        let u = await getUser();
        let ut = await isPatient();
        console.log(ut ? u.uid : $page.params.slug)
        let d = await getDoc(doc(db, "medical-profile", ut ? u.uid : $page.params.slug));
        if (d.exists() && d.data().form) {
            formData = d.data().form
        }
    })
</script>

<Navbar />

{#await isPatient()}
    ...
{:then p}
    <div class="bg-white">
        <div class="max-w-7xl mx-auto p-8 sm:p-12">
            <div>
                <h1 class="font-semibold text-4xl text-[#286480]">
                    {p ? "Hello!" : "Hello Doctor"}
                </h1>
                <p class="font-light text-md text-slate-500 mt-1">
                    {p
                        ? "Let's set up your patient profile"
                        : "Edit your patients profile"}
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div class="flex flex-col gap-8">
                    <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-bold text-slate-700 mb-4">
                            Personal Information
                        </h2>
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label
                                        for="first-name"
                                        class="block text-sm font-medium text-slate-600"
                                        >Name</label
                                    >
                                    <input
                                        bind:value={formData.personal.firstName}
                                        type="text"
                                        id="first-name"
                                        placeholder="Enter first name"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="middle-initial"
                                        class="block text-sm font-medium text-slate-600"
                                        >Middle initial</label
                                    >
                                    <input
                                        bind:value={
                                            formData.personal.middleInitial
                                        }
                                        type="text"
                                        id="middle-initial"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="last-name"
                                        class="block text-sm font-medium text-slate-600"
                                        >Last name</label
                                    >
                                    <input
                                        bind:value={formData.personal.lastName}
                                        type="text"
                                        id="last-name"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label
                                        for="dob"
                                        class="block text-sm font-medium text-slate-600"
                                        >Date of Birth</label
                                    >
                                    <input
                                        bind:value={formData.personal.dob}
                                        type="text"
                                        id="dob"
                                        placeholder="MM/DD/YYYY"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div class="col-span-2">
                                    <label
                                        for="gender"
                                        class="block text-sm font-medium text-slate-600"
                                        >Gender</label
                                    >
                                    <select
                                        bind:value={formData.personal.gender}
                                        id="gender"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100"
                                    >
                                        <option>Unspecified</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="address1"
                                        class="block text-sm font-medium text-slate-600"
                                        >Address Line 1</label
                                    >
                                    <input
                                        bind:value={formData.personal.address1}
                                        type="text"
                                        id="address1"
                                        placeholder="Street Address"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="address2"
                                        class="block text-sm font-medium text-slate-600"
                                        >Address Line 2</label
                                    >
                                    <input
                                        bind:value={formData.personal.address2}
                                        type="text"
                                        id="address2"
                                        placeholder="Apartment or suite"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div>
                                    <label
                                        for="city"
                                        class="block text-sm font-medium text-slate-600"
                                        >City</label
                                    >
                                    <input
                                        bind:value={formData.personal.city}
                                        type="text"
                                        id="city"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="state"
                                        class="block text-sm font-medium text-slate-600"
                                        >State/Province</label
                                    >
                                    <input
                                        bind:value={formData.personal.state}
                                        type="text"
                                        id="state"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="country"
                                        class="block text-sm font-medium text-slate-600"
                                        >Country</label
                                    >
                                    <input
                                        bind:value={formData.personal.country}
                                        type="text"
                                        id="country"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="zip"
                                        class="block text-sm font-medium text-slate-600"
                                        >ZIP Code</label
                                    >
                                    <input
                                        bind:value={formData.personal.zip}
                                        type="text"
                                        id="zip"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="email"
                                        class="block text-sm font-medium text-slate-600"
                                        >Email</label
                                    >
                                    <input
                                        bind:value={formData.personal.email}
                                        type="email"
                                        id="email"
                                        placeholder="Enter email"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="phone"
                                        class="block text-sm font-medium text-slate-600"
                                        >Phone number</label
                                    >
                                    <input
                                        bind:value={formData.personal.phone}
                                        type="tel"
                                        id="phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-bold text-slate-700 mb-4">
                            Emergency Contact
                        </h2>
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="ec-name"
                                        class="block text-sm font-medium text-slate-600"
                                        >Name</label
                                    >
                                    <input
                                        bind:value={
                                            formData.emergency.firstName
                                        }
                                        type="text"
                                        id="ec-name"
                                        placeholder="Enter first name"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="ec-lastname"
                                        class="block text-sm font-medium text-slate-600"
                                        >Last name</label
                                    >
                                    <input
                                        bind:value={formData.emergency.lastName}
                                        type="text"
                                        id="ec-lastname"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    for="ec-relationship"
                                    class="block text-sm font-medium text-slate-600"
                                    >Relationship</label
                                >
                                <select
                                    bind:value={formData.emergency.relationship}
                                    id="ec-relationship"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100"
                                >
                                    <option>Unspecified</option>
                                    <option>Spouse</option>
                                    <option>Parent</option>
                                    <option>Sibling</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="ec-email"
                                        class="block text-sm font-medium text-slate-600"
                                        >Email</label
                                    >
                                    <input
                                        bind:value={formData.emergency.email}
                                        type="email"
                                        id="ec-email"
                                        placeholder="Enter email"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="ec-phone"
                                        class="block text-sm font-medium text-slate-600"
                                        >Phone number</label
                                    >
                                    <input
                                        bind:value={formData.emergency.phone}
                                        type="tel"
                                        id="ec-phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-8">
                    <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-bold text-slate-700 mb-4">
                            Insurance
                        </h2>
                        <div class="space-y-4">
                            <div>
                                <label
                                    for="ins-provider"
                                    class="block text-sm font-medium text-slate-600"
                                    >Insurance Provider</label
                                >
                                <input
                                    bind:value={formData.insurance.provider}
                                    type="text"
                                    id="ins-provider"
                                    placeholder="Enter provider"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                />
                            </div>
                            <div>
                                <label
                                    for="ins-group"
                                    class="block text-sm font-medium text-slate-600"
                                    >Group number</label
                                >
                                <input
                                    bind:value={formData.insurance.groupNumber}
                                    type="text"
                                    id="ins-group"
                                    placeholder="Enter group number"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-bold text-slate-700 mb-4">
                            Current Medications
                        </h2>
                        <div class="space-y-4">
                            {#each formData.medications as item (item.id)}
                                <div
                                    class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <label
                                            for="med-name-{item.id}"
                                            class="block text-sm font-medium text-slate-600"
                                            >Name</label
                                        >
                                        <input
                                            bind:value={item.name}
                                            type="text"
                                            id={"med-name-" + item.id}
                                            placeholder="Medication name"
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="med-dosage-{item.id}"
                                            class="block text-sm font-medium text-slate-600"
                                            >Dosage</label
                                        >
                                        <input
                                            bind:value={item.dosage}
                                            type="text"
                                            id="med-dosage-{item.id}"
                                            placeholder="Amount taken"
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                        />
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <button
                            type="button"
                            on:click={addMedication}
                            class="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                            + Add more
                        </button>
                    </div>

                    <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-bold text-slate-700 mb-4">
                            Allergies
                        </h2>
                        <div class="space-y-4">
                            {#each formData.allergies as item (item.id)}
                                <div
                                    class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <label
                                            for="allergy-name-{item.id}"
                                            class="block text-sm font-medium text-slate-600"
                                            >Allergy</label
                                        >
                                        <input
                                            bind:value={item.allergy}
                                            type="text"
                                            id="allergy-name-{item.id}"
                                            placeholder="I'm allergic to..."
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="allergy-severity-{item.id}"
                                            class="block text-sm font-medium text-slate-600"
                                            >Severity</label
                                        >
                                        <select
                                            bind:value={item.severity}
                                            id="allergy-severity-{item.id}"
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100"
                                        >
                                            <option>Unspecified</option>
                                            <option>Mild</option>
                                            <option>Moderate</option>
                                            <option>Severe</option>
                                        </select>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <button
                            type="button"
                            on:click={addAllergy}
                            class="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                            + Add more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {#if !p}
        <div class="max-w-7xl mx-auto px-8 sm:px-12 mt-8">
            <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
                <h2 class="text-xl font-bold text-slate-700 mb-4">
                    Medical History
                </h2>
                <div>
                    <label for="medical-history" class="sr-only"
                        >Medical History</label
                    >
                    <textarea
                        bind:value={formData.medicalHistory}
                        id="medical-history"
                        rows="6"
                        placeholder="Add medical history..."
                        class="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    ></textarea>
                </div>
            </div>
        </div>
    {/if}
{/await}

<div class="flex justify-end gap-5 px-28">
    <button on:click={downloadInfo} class="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded">Export as Json</button> 
    <button on:click={saveInfo} class="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded">Save Changes</button> 
</div>
<div class="h-10">  
</div>

<Footer/>


