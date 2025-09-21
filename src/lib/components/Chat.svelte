<script>
    import { addChatMessage, database, getUser, isPatient, user } from "$lib/api/firebase";
    import { onValue, ref } from "firebase/database";
    import { onMount } from "svelte";

    let chatHistory = [];
    let currentMessage = "";

    onMount(async () => {
        let u = await getUser();
        const messagesRef = ref(database, 'chats/' + (isPatient() ? u.uid : "error"));
        onValue(messagesRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            console.log(data);
            chatHistory = data;
        });
    })

    const sendButtonClick = () => {
        addChatMessage(currentMessage);
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