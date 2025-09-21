<script>
    import { sendPatientInfo } from "$lib/api/firebase";

    export let providerEmail;

    const submitForm = async () => {
        sendPatientInfo({
            provider: providerEmail
        })
    }
</script>

Provider Email:
<input type="email" bind:value={providerEmail}/>
<button on:click={submitForm}>Save</button>
