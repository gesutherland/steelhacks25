<script>
    import Chat from "./Chat.svelte";
    import DashboardNavElement from "./DashboardNavElement.svelte";
    import ProfileForm from "./ProfileForm.svelte";
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
</script>
<<<<<<< HEAD
<Navbar/>
<div class="flex flex-col items-center justify-center h-screen bg-cover bg-center" style="background-image: url('/unsplash_pKpipZVVEC0.png')">
    <DashboardNavElement imageUrl="/profilepic.svg" title="View your profile" subtext="Access your information & medical history" buttonText="Continue"/>   
    <DashboardNavElement imageUrl="/Mask group.svg" title="Communicate with your provider" subtext="Stay connected with your healthcare team" buttonText="Start Chat"/>
    <DashboardNavElement imageUrl="/Mask group2.svg" title="Update Medical Events" subtext="Input critical information to keep your team up to date" buttonText="Add a new event"/>
</div>
<Footer/>
=======
<div class="flex flex-col">
    <div class="flex flex-col">
        <DashboardNavElement title="View your profile" subtext="Access your information & medical history" buttonText="Edit"></DashboardNavElement>    
        <DashboardNavElement title="Communicate with your provider" subtext="Stay connected with your healthcare team" buttonText="Start Chat"></DashboardNavElement>
        <DashboardNavElement title="Update Medical Events" subtext="Input critical information to keep your team up to date" buttonText="Add a new event"></DashboardNavElement>
    </div>
</div>
>>>>>>> 7426e42796d10f8d4d706df90d57633fc63cf5de
