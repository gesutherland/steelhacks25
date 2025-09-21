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

<div class="flex flex-col bg-white p-10 rounded-lg shadow-lg gap-4">
    <div class="bg-blue-500 p-4 rounded-lg text-white flex justify-center items-center">
        <img src="/ourchartlogo.svg" alt="OurChart Logo" class="w-32 mb-4"/>
    </div>
    <input class="checked:bg-black" type="radio" name="userType" id="patients" value="patients" checked={autoUserType=="patients"?"checked":""} on:change={(v) => selectedUserType = "patients"}/>
    <label for="patients">I'm a Patient</label>
    <input class="checked:bg-black" type="radio" name="userType" id="providers" value="providers" checked={autoUserType=="providers"?"checked":""} on:change={(v) => selectedUserType = "providers"}/>
    <label for="providers">I'm a Provider</label>

    <input class="border-2 border-gray-300 p-2" bind:value={email} type="email" />
    <input class="border-2 border-gray-300 p-2" bind:value={password} type="password" />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={signUp}>Sign up</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={logIn}>Log in</button>
</div>