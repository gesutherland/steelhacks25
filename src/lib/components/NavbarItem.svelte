<script>
    export let url;
</script>

<a href={url} class="cursor-pointer transition hover:text-blue-600 hover:scale-105 px-3">
    <slot></slot>
</a>