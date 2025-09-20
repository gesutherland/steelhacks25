<script>
    import { login, signup, auth, userType, user } from "$lib/api/firebase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    let email;
    let password;
    export let autoUserType = "patients";
    let selectedUserType = autoUserType;

    onMount(async () => {
        let unsub = auth.onAuthStateChanged(u => {
            if (u) {
                goto("/dashboard")
                unsub();
            }
        })
    })

    const signUp = () => {
        signup(email, password, selectedUserType);
    }
    const logIn = () => {
        login(email, password);
    }
</script>

<div>
    <input type="radio" name="userType" id="patients" value="patients" checked={autoUserType=="patients"?"checked":""} on:change={(v) => selectedUserType = "patients"}/>
    <label for="patients">I'm a Patient</label>
    <input type="radio" name="userType" id="providers" value="providers" checked={autoUserType=="providers"?"checked":""} on:change={(v) => selectedUserType = "providers"}/>
    <label for="providers">I'm a Provider</label>
</div>

<input bind:value={email} type="email" />
<input bind:value={password} type="password" />
<button on:click={signUp}>Sign up</button>
<button on:click={logIn}>Log in</button>