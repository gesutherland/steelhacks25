<script>
    import { isPatient } from "$lib/api/firebase";

</script>

{#await isPatient()}
    ...
{:then p} 
    {#if p}
        <div>
            <h1 class="flex justify-start text-3xl font-semibold text-[#286480] mb-4">Urgent Events</h1>
            <div class="flex justify-center rounded-full bg-white w-75">
                <div class="flex start rounded-full bg-white w-65">
                    <input
                    type="text" 
                    placeholder="Type to enter text" 
                    class="px-1 text-[#94BAC4]"/>
                </div>
                <div class="flex justify-between">
                    <h2 class="text-3xl font-semibold text-[#286480]">To: Dr. Sarah Johnson</h2>" <!--Doctor Name-->
                    <button class="px-4 text-gray-600 hover:text-gray-800 bg-[#70A0B6]">Send Message</button>
                </div>
            </div>
        </div>
    {:else}
        <h1 class="text-3xl font-bold mb-4">Patient Events</h1>
        <p>List of patient events will appear here.</p>
    {/if}
{/await}


