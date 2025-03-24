<script lang="ts">
  export let activeUsers: string[] = [];
  export let onClose;
</script>

<div
  class="fixed top-8 right-8 bg-white shadow-2xl rounded-2xl w-80 max-h-[80vh] overflow-y-auto z-50 border border-gray-200"
>
  <div
    class="flex items-center justify-between px-4 py-3 border-b border-gray-200"
  >
    <h2 class="text-lg font-semibold text-gray-800">Active Users</h2>
    <button
      on:click={onClose}
      class="text-gray-500 hover:text-red-500 text-xl font-bold"
    >
      &times;
    </button>
  </div>
  <ul class="p-4 space-y-2">
    {#each activeUsers as user}
      <li
        class="bg-gray-100 p-3 rounded-lg text-gray-700 shadow-sm hover:bg-gray-200 transition-all duration-200"
      >
        {user}
      </li>
    {/each}
  </ul>
</div>
