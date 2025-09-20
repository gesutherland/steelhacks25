<script>
    import { signout } from "$lib/api/firebase";
</script>

<button on:click={signout()}>Sign Out</button>