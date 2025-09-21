<script>
    import { sendPatientInfo } from "$lib/api/firebase";

    export let providerEmail;

    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    // A single object to hold all the form data
    let formData = {
        personal: {
        firstName: '',
        middleInitial: '',
        lastName: '',
        dob: '',
        gender: 'Unspecified',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        email: '',
        phone: ''
        },
        emergency: {
        firstName: '',
        lastName: '',
        relationship: 'Unspecified',
        email: '',
        phone: ''
        },
        insurance: {
        provider: '',
        groupNumber: ''
        },
        medications: [
        { id: 1, name: '', dosage: '' }
        ],
        allergies: [
        { id: 1, allergy: '', severity: 'Unspecified' }
        ]
    };

    $: console.log(formData)

    function addMedication() {
        formData.medications = [
        ...formData.medications, 
        { id: Date.now(), name: '', dosage: '' }
        ];
    }

    function addAllergy() {
        formData.allergies = [
        ...formData.allergies, 
        { id: Date.now(), allergy: '', severity: 'Unspecified' }
        ];
    }
</script>

Random Data
<input type="email" bind:value={providerEmail}/>
<button>Save</button>

<Navbar/>

<div class="bg-white">

  <div class="max-w-7xl mx-auto p-8 sm:p-12">
    <div>
      <h1 class="font-semibold text-4xl text-[#286480]">Hi, Lena!</h1>
      <p class="font-light text-md text-slate-500 mt-1">Let's set up your patient profile.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

      <div class="flex flex-col gap-8">

        <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-bold text-slate-700 mb-4">Personal Information</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="first-name" class="block text-sm font-medium text-slate-600">Name</label>
                <input bind:value={formData.personal.firstName} type="text" id="first-name" placeholder="Enter first name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="middle-initial" class="block text-sm font-medium text-slate-600">Middle initial</label>
                <input bind:value={formData.personal.middleInitial} type="text" id="middle-initial" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="last-name" class="block text-sm font-medium text-slate-600">Last name</label>
                <input bind:value={formData.personal.lastName} type="text" id="last-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="dob" class="block text-sm font-medium text-slate-600">Date of Birth</label>
                <input bind:value={formData.personal.dob} type="text" id="dob" placeholder="MM/DD/YYYY" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div class="col-span-2">
                <label for="gender" class="block text-sm font-medium text-slate-600">Gender</label>
                <select bind:value={formData.personal.gender} id="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  <option>Unspecified</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="address1" class="block text-sm font-medium text-slate-600">Address Line 1</label>
                <input bind:value={formData.personal.address1} type="text" id="address1" placeholder="Street Address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="address2" class="block text-sm font-medium text-slate-600">Address Line 2</label>
                <input bind:value={formData.personal.address2} type="text" id="address2" placeholder="Apartment or suite" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label for="city" class="block text-sm font-medium text-slate-600">City</label>
                <input bind:value={formData.personal.city} type="text" id="city" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-slate-600">State/Province</label>
                <input bind:value={formData.personal.state} type="text" id="state" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-slate-600">Country</label>
                <input bind:value={formData.personal.country} type="text" id="country" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="zip" class="block text-sm font-medium text-slate-600">ZIP Code</label>
                <input bind:value={formData.personal.zip} type="text" id="zip" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-slate-600">Email</label>
                <input bind:value={formData.personal.email} type="email" id="email" placeholder="Enter email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-slate-600">Phone number</label>
                <input bind:value={formData.personal.phone} type="tel" id="phone" placeholder="(xxx) xxx-xxxx" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-bold text-slate-700 mb-4">Emergency Contact</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="ec-name" class="block text-sm font-medium text-slate-600">Name</label>
                <input bind:value={formData.emergency.firstName} type="text" id="ec-name" placeholder="Enter first name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="ec-lastname" class="block text-sm font-medium text-slate-600">Last name</label>
                <input bind:value={formData.emergency.lastName} type="text" id="ec-lastname" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
            <div>
              <label for="ec-relationship" class="block text-sm font-medium text-slate-600">Relationship</label>
              <select bind:value={formData.emergency.relationship} id="ec-relationship" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                <option>Unspecified</option>
                <option>Spouse</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Other</option>
              </select>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="ec-email" class="block text-sm font-medium text-slate-600">Email</label>
                <input bind:value={formData.emergency.email} type="email" id="ec-email" placeholder="Enter email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="ec-phone" class="block text-sm font-medium text-slate-600">Phone number</label>
                <input bind:value={formData.emergency.phone} type="tel" id="ec-phone" placeholder="(xxx) xxx-xxxx" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="flex flex-col gap-8">
        
        <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-bold text-slate-700 mb-4">Insurance</h2>
          <div class="space-y-4">
            <div>
              <label for="ins-provider" class="block text-sm font-medium text-slate-600">Insurance Provider</label>
              <input bind:value={formData.insurance.provider} type="text" id="ins-provider" placeholder="Enter provider" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
            </div>
            <div>
              <label for="ins-group" class="block text-sm font-medium text-slate-600">Group number</label>
              <input bind:value={formData.insurance.groupNumber} type="text" id="ins-group" placeholder="Enter group number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
            </div>
          </div>
        </div>

        <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-bold text-slate-700 mb-4">Current Medications</h2>
          <div class="space-y-4">
            {#each formData.medications as item (item.id)}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="med-name-{item.id}" class="block text-sm font-medium text-slate-600">Name</label>
                  <input bind:value={item.name} type="text" id="med-name-{item.id}" placeholder="Medication name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                </div>
                <div>
                  <label for="med-dosage-{item.id}" class="block text-sm font-medium text-slate-600">Dosage</label>
                  <input bind:value={item.dosage} type="text" id="med-dosage-{item.id}" placeholder="Amount taken" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                </div>
              </div>
            {/each}
          </div>
          <button type="button" on:click={addMedication} class="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">
            + Add more
          </button>
        </div>

        <div class="bg-slate-100 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-bold text-slate-700 mb-4">Allergies</h2>
          <div class="space-y-4">
            {#each formData.allergies as item (item.id)}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="allergy-name-{item.id}" class="block text-sm font-medium text-slate-600">Allergy</label>
                <input bind:value={item.allergy} type="text" id="allergy-name-{item.id}" placeholder="I'm allergic to..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
              </div>
              <div>
                <label for="allergy-severity-{item.id}" class="block text-sm font-medium text-slate-600">Severity</label>
                <select bind:value={item.severity} id="allergy-severity-{item.id}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  <option>Unspecified</option>
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </div>
            </div>
            {/each}
          </div>
          <button type="button" on:click={addAllergy} class="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">
            + Add more
          </button>
        </div>

      </div>

    </div>
  </div>

</div>
<Footer/>


