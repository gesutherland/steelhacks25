<script>
    import LeftDashboardNavElement from "./LeftDashboardNavElement.svelte";
    import LogoutButton from "./LogoutButton.svelte";
</script>

<div class="flex flex-col w-64 h-full">
    <LeftDashboardNavElement url="info">Medical Info</LeftDashboardNavElement>
    <LeftDashboardNavElement url="events">Medical Events</LeftDashboardNavElement>
    <LeftDashboardNavElement url="chat">Doctor Chat</LeftDashboardNavElement>
    <LogoutButton />
</div>