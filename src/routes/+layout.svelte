<script>
  import { Toaster } from "svelte-5-french-toast";
    let { children } = $props();
    import "../app.css";
  </script>
  <Toaster />
  {@render children()}