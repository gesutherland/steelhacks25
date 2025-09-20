<script>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { userType } from "$lib/api/firebase";

    export let url;

    
</script>

<div class="mr-auto">
    <button on:click={goto("/" + $userType + "/dashboard/" + url)}><slot /></button>

</div>