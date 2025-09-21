<script>
    import Chat from "./Chat.svelte";
    import DashboardNavElement from "./DashboardNavElement.svelte";
    import ProfileForm from "./ProfileForm.svelte";
</script>

Patient Dashboard
<div class="flex">
    <DashboardNavElement title="View your profile" url="/dashboard/profile"/>    
    <DashboardNavElement title="Communicate with providers" url="/dashboard/communication"/>
    <DashboardNavElement title="Update medical events" url="/dashboard/events"/>
</div>