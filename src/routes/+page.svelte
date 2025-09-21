<script>
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>
<Navbar />

<div>
    <img src="" alt="">
    <h1>Medical info minus all the fluff</h1>
    <p>Access patient charts, prescriptions, and updates in seconds</p>
    <div>
        <button>Explore Patient Portal</button>
        <button>Explore Provider Portal</button>
    </div>
</div>
<div>
    <div>
        <h1>What We Do</h1>
        <h1>Brings patients and providers together</h1>
        <p>Revolutionizing healthcare across hospitals and state lines by providing a seamless charting system. Our platform bridges the gap between EHRs to ensure easily accessible information for all patients.</p>
    </div>

    <div>
        <img src="" alt="">
        <img src="" alt="">
    </div>
</div>

<button on:click={goto("/login")}>For providers</button>

<Footer />