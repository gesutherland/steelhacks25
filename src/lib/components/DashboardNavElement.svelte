<script>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { onMount } from "svelte";

    export let onClick;
    export let path;

    export let title;
    export let subtext;
    export let buttonText;
    export let imageUrl;
    export let url = '#'
</script>

<div class="flex flex-row font-sans bg-[#95BED0] text-white bg-opacity-70 rounded-lg shadow-lg p-6 m-4 w-3/4 max-w-4xl">
    <div class="flex justify-center items-center p-4">
        <img class="w-30 h-30" src={imageUrl} alt=""/>
    </div>
    <div class="flex flex-col grow justify-evenly" >
        <div class="font-semibold text-3xl">{title}</div>
        <div class="text-lg">{subtext}</div>
        <div><button class="bg-[#70A0B6] text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform cursor-pointer" on:click={onClick(path)}>{buttonText}</button></div>
    </div>
</div>