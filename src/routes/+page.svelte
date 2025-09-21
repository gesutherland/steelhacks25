<script>
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>
<Navbar />

<div class="flex flex-col items-center justify-center font-sans h-130 bg-[#003A69]/40 bg-blend-multiply bg-cover bg-position-[center_top_-10rem] text-white"style="background-image: url('/doctor.png')">
    <div class = "text-center" >
        <h1 class="font-semibold text-5xl">Medical info minus all the hassle</h1>
        <p class="font-light text-2xl py-2">Access patient records, messages, and updates in seconds</p>
    </div>
    <div class="mt-8">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button> <!--This is where you get to login page -Colin-->
    </div>
</div>
<div class="flex justify-between items-start px-20 py-10 gap-10">

  <div class="w-1/2 flex justify-start flex-col mt-8">
    <h1 class="font-medium text-2xl text-[#70A0B6]">What We Do</h1>
    <h1 class="font-semibold text-6xl text-[#286480] leading-tight mt-4">Brings patients and providers together</h1>
    <p class="font-light text-xl text-[#70A0B6] leading-relaxed mt-8">Revolutionizing healthcare across hospitals and state lines by providing a smart, seamless charting system. Our platform bridges the gap between EHRs to ensure easily accessible information for all patients.</p>
  </div>

  <div class="w-1/2">
    <img src="/medical_people.svg" alt="" class="w-full h-auto -mt-15" />
  </div>

</div>
<div class="flex justify-between items-start px-20 py-10 gap-10 -mt-35">
  <div class="w-1/2">
    <img src="/medical_people.svg" alt="" class="w-full h-auto -mt-15" />
  </div>

  <div class="w-1/2 flex justify-start flex-col mt-8">
    <h1 class="font-medium text-2xl text-[#70A0B6]">What We Do</h1>
    <h1 class="font-semibold text-6xl text-[#286480] leading-tight mt-4">Brings patients and providers together</h1>
    <p class="font-light text-xl text-[#70A0B6] leading-relaxed mt-8">Revolutionizing healthcare across hospitals and state lines by providing a smart, seamless charting system. Our platform bridges the gap between EHRs to ensure easily accessible information for all patients.</p>
  </div>
</div>


<Footer />