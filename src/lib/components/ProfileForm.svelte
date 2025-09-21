<script>
    import { sendPatientInfo } from "$lib/api/firebase";

    export let providerEmail;

    
</script>

Random Data
<input type="email" bind:value={providerEmail}/>
<button>Save</button>
