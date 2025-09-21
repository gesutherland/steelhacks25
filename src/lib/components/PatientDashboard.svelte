<script>
    import Chat from "./Chat.svelte";
    import DashboardNavElement from "./DashboardNavElement.svelte";
    import ProfileForm from "./ProfileForm.svelte";
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
</script>
<div class="flex flex-col">
    <div class="flex flex-col">
        <DashboardNavElement title="View your profile" subtext="Access your information & medical history" buttonText="Edit"></DashboardNavElement>    
        <DashboardNavElement title="Communicate with your provider" subtext="Stay connected with your healthcare team" buttonText="Start Chat"></DashboardNavElement>
        <DashboardNavElement title="Update Medical Events" subtext="Input critical information to keep your team up to date" buttonText="Add a new event"></DashboardNavElement>
    </div>
</div>
