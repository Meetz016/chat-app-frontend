<script>

  import Card from "$lib/Card.svelte";

</script>
<main>
  <Card/>
</main>
  <style lang="postcss">
    @reference "tailwindcss";
    :global(html) {
      background-color: theme(--color-gray-100);
    }
  </style>