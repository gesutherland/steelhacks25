<script>
    import Login from "$lib/components/Login.svelte";
    import { page } from "$app/state";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />
<div class="flex flex-col items-center justify-center h-screen" style="background-image: url('/unsplash_pKpipZVVEC0.png')">
    <Login autoUserType={"providers"}></Login>
</div>
<Footer />