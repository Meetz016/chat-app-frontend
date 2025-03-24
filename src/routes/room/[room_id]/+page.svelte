<script lang="ts">
    import { page } from '$app/state';
  import { getSocket } from '$lib/socket.js';
    import { onMount } from 'svelte';
    import toast, {Toaster} from 'svelte-5-french-toast'
    const room_id: string = page.params.room_id;
  
    onMount(() => {
      console.log(`Joined room id: ${room_id}`);
  
      const username = sessionStorage.getItem("username");
      if (!username) {
        alert("Username not found. Please go back and enter your username.");
        return;
      }
  
      const socket =getSocket();
      socket.onopen = () => {
        console.log("WebSocket connection successful");
        socket.send(JSON.stringify({
          type: "join",
          room_id,
          username
        }));
      };
  
      socket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
  
          if (response.type === "userJoined") {
            toast.success(`${response.data.username} has joined the room`)
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
  </script>
  