<script>
    import { signout } from "../api/firebase";
</script>

<button on:click={signout()}>Sign Out</button>