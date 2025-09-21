<script>
    import { goto } from "$app/navigation";
    import { auth, isPatient } from "$lib/api/firebase";
    import ProfileForm from "$lib/components/ProfileForm.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        if (!await isPatient()) {
            goto("/dashboard");
        }
    })
</script>

<ProfileForm></ProfileForm>