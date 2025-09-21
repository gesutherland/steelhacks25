<script>
    import { isPatient } from "$lib/api/firebase";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />

{#await isPatient()}
    ...
{:then p} 
    {#if p}
        <div class="p-4">
            <div class="bg-[#E6F2F7] rounded-lg p-6 w-full max-w-2xl mx-auto">
                
                <textarea
                placeholder="The migraines attacks are coming about twice a week now instead of daily..."
                class="w-full h-52 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2"
                ></textarea>
                
                <div class="flex justify-between items-center mt-4">
                
                <h2 class="text-xl font-semibold text-[#286480]">To: Dr. Sarah Johnson</h2>
                
                <button class="bg-[#70A0B6] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#5a8a9e] transition-colors">
                    Send Message
                </button>
                </div>
            </div>
        </div>
    {:else}
        <div> 
            <h1 class="text-3xl text-[#286480] font-bold text mb-4 mt-4 px-4">Urgent Events</h1>
            <div class="flex-rows justify-between rounded-lg p-6 w-full max-w-2xl mx-auto bg-[#E6F2F7] mb-4">
                <div class="flex justify-between flex-columns"> 
                <p class="text-xl font-semibold text-[#286480]">Evany Rodriguez</p>
                <button class="bg-[#70A0B6] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#5a8a9e] transition-colors">
                    Message patient
                </button>
                </div>
                <div class="mt-4">
                    <p class="text-lg text-[#286480] w-full h-36 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2">
                        Hello text here
                    </p>
                </div>

            </div>
        </div>
    {/if}
{/await}

<Footer />

