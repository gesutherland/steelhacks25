<script>
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    let imagePath = "/ourchartlogo.svg";
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet">


<div class="flex flex-row justify-between px-15 items-center h-15" >
    <img class="w-39" src={imagePath} alt="OurChart logo">
    <div class="flex flex-row gap-x-4 font-large font-sans text-[#286480]">
        <NavbarItem>Home</NavbarItem>
        <NavbarItem>Find Your Provider</NavbarItem>
        <NavbarItem>Support</NavbarItem>
        <NavbarItem>Login</NavbarItem>
        <NavbarItem>Logout</NavbarItem>
    </div>
</div>