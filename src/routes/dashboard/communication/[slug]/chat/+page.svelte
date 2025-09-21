<script>
    import Chat from "$lib/components/Chat.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
</script>
<Navbar/>
<h1 class="text-[#286480] text-3xl font-semibold py-10 px-15">Messaging</h1>
<div class="flex flex-col items-center h-screen bg-cover bg-center">
    <Chat></Chat>
</div>