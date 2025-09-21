<script>
    export let url;
</script>

<button 
    class="hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none font-inherit text-inherit p-0"
    on:click={() => goto(url)}
><slot></slot></button>