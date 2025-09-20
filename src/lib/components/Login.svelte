<script>
    import { login, getUser } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let email;
    let password;

    onMount(() => {
        let user = getUser().then(u => {
            console.log(u);
            if (u) {
                goto("./dashboard");
            }
        });
    })

    const signUp = () => {
        login(email, password);
    }
</script>

<input bind:value={email} type="email" />
<input bind:value={password} type="password" />
<button on:click={signUp}>Sign up</button>