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

<div class="bg-blue-300 grid grid-cols-1 w-64">
    <div class="h-72 bg-blue-400 flex flex-col gap-3 p-3 overflow-y-scroll">
        {#each chatHistory as message}
            <div class="bg-blue-500 whitespace-pre-wrap">{message}</div>
        {/each}
    </div>
    <textarea bind:value={currentMessage} class="h-16 resize-none"></textarea>
    <button on:click={sendButtonClick} class="bg-blue-200">Send</button>
</div>