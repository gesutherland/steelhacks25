<script>
    import { goto } from "$app/navigation";
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    let imagePath = "/ourchartlogo.svg";

    function handleNavigation (page) {
        switch(page) {
            case 'Home':
                goto('/');
                break;
            case 'Find Your Provider':
                goto('/providers');
                break;
            case 'Support':
                goto('/support');
                break;
            case 'Login':
                goto('/login');
                break;
            case 'Logout':
                goto('/logout');
                break;
            default:
                goto('/');
        }
    }
</sscript>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet">


<div class="flex flex-row justify-between px-15 items-center h-15" >
    <img class="w-39" src={imagePath} alt="OurChart logo" on:click={() => goto('/')}/>
    <div class="flex flex-row gap-x-4 font-large font-sans text-[#286480]">
        <NavbarItem on:click={() => handleNavigation ('Home')}>Home</NavbarItem>
        <NavbarItem on:click={() => handleNavigation('Providers')}>Find Your Provider</NavbarItem>
        <NavbarItem on:click={() => handleNavigation('Support')}>Support</NavbarItem>
        <NavbarItem on:click={() => handleNavigation('Login')}>Login</NavbarItem>
        <NavbarItem on:click={() => handleNavigation('Logout')}>Logout</NavbarItem>
    </div>
</div>