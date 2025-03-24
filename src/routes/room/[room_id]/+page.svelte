<script lang="ts">
  import { page } from "$app/state";
  import ActiveUserCard from "$lib/ActiveUserCard.svelte";
  import { getSocket } from "$lib/socket.js";
  import { onMount } from "svelte";
  import toast from "svelte-5-french-toast";
  const room_id: string = page.params.room_id;
  let showActive: boolean = $state(false);
  let activeUsers: string[] = $state([]);

  onMount(() => {
    console.log(`Joined room id: ${room_id}`);

    const username = sessionStorage.getItem("username");
    if (!username) {
      alert("Username not found. Please go back and enter your username.");
      return;
    }

    const socket = getSocket();
    socket.onopen = () => {
      console.log("WebSocket connection successful");
      socket.send(
        JSON.stringify({
          type: "join",
          room_id,
          username,
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.type === "userJoined") {
          toast.success(`${response.data.username} has joined the room`);
          activeUsers = response.data.allUsers;
        }

        if (response.type == "userLeft") {
          toast.success(response.message);
          activeUsers = response.data.allUsers;
        }

        console.log(response);
      } catch (err) {
        console.log("Error parsing message:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("error:", err);
    };
  });

  function showActiveUsers() {
    if (showActive) {
      showActive = false;
      return;
    }
    showActive = true;
  }
</script>

<main>
  <div class="flex h-screen items-center justify-center">
    <div>
      <button
        onclick={showActiveUsers}
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md flex flex-col items-center space-y-1"
      >
        <div class="text-lg font-semibold">Chat Room</div>
        <p class="text-xs text-gray-200">Click to view all active users</p>
      </button>

      {#if showActive}
        <ActiveUserCard {activeUsers} onClose={showActiveUsers} />
      {/if}

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          class="flex-1 rounded-md border border-gray-200 px-4 py-2 focus:border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          class="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
          <span class="sr-only">Send message</span>
        </button>
      </div>
    </div>
  </div>
</main>
