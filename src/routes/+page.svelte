<script>
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>
<Navbar />

<div class="flex flex-col items-center justify-center font-sans h-130 bg-[#003A69]/40 bg-blend-multiply bg-cover bg-position-[center_top_-10rem] text-white"style="background-image: url('/doctor.png')">
    <div class = "text-center" >
        <h1 class="font-semibold text-5xl">Medical info minus all the fluff</h1>
        <p class="font-light text-2xl">Access patient charts, prescriptions, and updates in seconds</p>
    </div>
    <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Explore Patient Portal</button>
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