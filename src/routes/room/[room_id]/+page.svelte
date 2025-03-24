<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';
  
    const room_id: string = page.params.room_id;
  
    onMount(() => {
      console.log(`Joined room id: ${room_id}`);
  
      const username = sessionStorage.getItem("username");
      if (!username) {
        alert("Username not found. Please go back and enter your username.");
        return;
      }
  
      const socket = new WebSocket('ws://localhost:8080');
  
      socket.onopen = () => {
        console.log("✅ WebSocket connection successful");
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
            alert(`${response.data.username} has joined the room`);
          }
  
          console.log("📩 Received:", response);
        } catch (err) {
          console.log("❌ Error parsing message:", err);
        }
      };
  
      socket.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
      };
    });
  </script>
  