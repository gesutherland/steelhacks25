<script>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { userType } from "$lib/api/firebase";

    export let onClick;
    export let path;

    export let title;
    export let subtext;
    export let buttonText;
    export let imageUrl;
</script>

<div class="mr-auto">
    <img src={imageUrl} alt="" />
    <div>
        <div>{title}</div>
        <div>{subtext}</div>
        <button on:click={onClick(path)}>{buttonText}</button>
    </div>
</div>