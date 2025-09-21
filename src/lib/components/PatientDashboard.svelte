<script>
    import Chat from "./Chat.svelte";
    import DashboardNavElement from "./DashboardNavElement.svelte";
    import ProfileForm from "./ProfileForm.svelte";
</script>
<body class="flex flex-col">
    <div class="flex flex-col">
        <DashboardNavElement title="View your profile" subtext="Access your information & medical history" buttonText="Edit"/>    
        <DashboardNavElement title="Communicate with your provider" subtext="Stay connected with your healthcare team" buttonText="Start Chat"/>
        <DashboardNavElement title="Update Medical Events" subtext="Input critical information to keep your team up to date" buttonText="Add a new event"/>
    </div>
</body>
