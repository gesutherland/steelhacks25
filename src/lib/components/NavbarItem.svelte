<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch('click');
    }
</script>

<div><slot></slot></div>