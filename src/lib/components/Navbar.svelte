<script>
    import { goto } from "$app/navigation";
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    import { onMount } from "svelte";
    let imagePath = "/ourchartlogo.svg";
    import LogoutButton from "./LogoutButton.svelte";
    import { auth } from "$lib/api/firebase";

    let loginState
    onMount(async () => {
        auth.onAuthStateChanged(u => {
            console.log(u);
            loginState = u;
        })
    })
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet">

<div class="flex flex-row justify-between px-15 items-center h-15" >
    <img class="w-39 cursor-pointer hover:scale-105 transition-transform" src={imagePath} alt="OurChart logo" on:click={() => goto('/')}/>
    <div class="flex flex-row gap-x-4 font-large font-sans text-[#286480]">
        <NavbarItem url="/">Home</NavbarItem>
        {#if loginState}
            <NavbarItem url="/dashboard">Dashboard</NavbarItem>
            <NavbarItem url="/"><LogoutButton></LogoutButton></NavbarItem>
        {:else}
            <NavbarItem url="/login">Login</NavbarItem>
        {/if}
    </div>
</div>