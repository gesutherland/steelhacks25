<script>
    export let url;
</script>

<a href={url} class="hover:text-blue-600 transition-colors cursor-pointer">
    <slot></slot>
</a>