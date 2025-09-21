<script>
    import DashboardNavElement from "./DashboardNavElement.svelte";
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
</script>
<Navbar/>
<div class="flex flex-col items-center justify-center h-screen bg-cover bg-center" style="background-image: url('/unsplash_pKpipZVVEC0.png')">

<DashboardNavElement title="View Patient Profiles" subtext="Access list of patient profiles" imageUrl="/profilepic.svg" buttonText="View Patients"></DashboardNavElement>
<DashboardNavElement title="View Patient Events" subtext="Access urgent patient information" imageUrl="/Mask group2.svg" buttonText="View Events"></DashboardNavElement>
</div>
<Footer/>