<script>
    import { page } from "$app/stores";
    import { addChatMessage, database, getUser, isPatient, selectedPatient, user } from "../api/firebase";
    import { onValue, ref } from "firebase/database";
    import { onMount } from "svelte";

    let chatHistory = [];
    let currentMessage = "";
    let messagesRef;

    onMount(async () => {
        let u = await getUser();
        messagesRef = ref(database, 'chats/' + (await isPatient() ? $page.params.slug + u.uid : u.uid + $page.params.slug));
        onValue(messagesRef, (snapshot) => {
            if (!snapshot.exists()) return;
            const data = Object.values(snapshot.val());
            chatHistory = data;
        });
    })

    const sendButtonClick = () => {
        if (!messagesRef) return;
        addChatMessage(currentMessage, messagesRef);
        currentMessage = "";
    }
</script>

<div class="bg-white flex flex-col justify-between w-3/5 h-[700px] border-2 border-[#C9C9C9] p-3 gap-3 rounded-md text-[#70A0B6]">
    <div class="flex flex-col gap-3 p-3 overflow-y-scroll">
        {#each chatHistory as message}
            <div class="bg-white whitespace-pre-wrap border-2 border-[#C9C9C9] p-3 gap-3 rounded-md font-semibold">{message}</div>
        {/each}
    </div>
    <div class="flex flex-row bg-amber-950/0 h-[5.25rem] gap-3 p-3">
        <textarea bind:value={currentMessage} class="resize-none h-16 grow bg-white border-2 border-[#C9C9C9] rounded-md"></textarea>
        <button on:click={sendButtonClick} class="h-16 w-24 rounded-md bg-[#70A0B6] text-white font-bold hover:scale-105 transition-transform cursor-pointer">Send</button>
    </div>
        
</div>