<script>
    import { goto } from "$app/navigation";
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    let imagePath = "/ourchartlogo.svg";

</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet">


<div class="flex flex-row justify-between px-15 items-center h-15" >
    <img class="w-39" src={imagePath} alt="OurChart logo" on:click={() => goto('/')}/>
    <div class="flex flex-row gap-x-4 font-large font-sans text-[#286480]">
        <NavbarItem on:click={goto("/")}>Home</NavbarItem>
        <NavbarItem on:click={goto("/providers")}>Find Your Provider</NavbarItem>
        <NavbarItem on:click={goto("/support")}>Support</NavbarItem>
        <NavbarItem on:click={goto("/login")}>Login</NavbarItem>
        <NavbarItem on:click={goto("/logout")}>Logout</NavbarItem>
    </div>
</div>