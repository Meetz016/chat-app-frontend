<script>
    import { goto } from '$app/navigation';
  import { json } from '@sveltejs/kit';
  import { getSocket } from './socket.js';
    let showCreateRoom = false;
  let showJoinRoom = false;
  let username = '';
  let room_id = '';

  function toggleCreate() {
    showCreateRoom = true;
    showJoinRoom = false;
  }

  function toggleJoin() {
    showJoinRoom = true;
    showCreateRoom = false;
  }

  function handleCreateRoom(){
   const socket=getSocket()
   sessionStorage.setItem("username",username)
   socket.onopen=()=>{
    console.log("Connection successful")
    socket.send(JSON.stringify({
          type: "create",
          username: username
        }));
   }

   socket.onmessage=(event)=>{
    try{
      const response=JSON.parse(event.data);
      if(response.type=="roomCreated"){
        goto(`/room/${response.data.roomId}`)
      }

      if(response.type=="userJoined"){
        alert(`${response.data.username} has joined the chat bro`)
      }


    }catch(err){
      console.log(err)
    }
   }

   socket.onerror = (err) => {
    console.error('❌ WebSocket connection error:', err);
  };
  }


  function handleJoinRoom(){
    const socket=getSocket()
    sessionStorage.setItem("username",username)
    socket.onopen=()=>{
      console.log("User clicked on the join room")
      const data={
      type:"join",
      username:username,
      room_id:room_id
    }
    socket.send(JSON.stringify(data))
    }
    

    socket.onmessage=(event)=>{
      try{
        const response=JSON.parse(event.data)
        console.log(response)
        if(response.type=="roomJoined"){
          const room_id=response.data.roomId;

          goto(`/room/${room_id}`)
        }
      }catch(err){
        console.log(err)
      }
    }
  }
</script>

<main class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Chat Application
          </h1>
          <p class="text-gray-600 mt-2">Connect with others in real-time</p>
        </div>
  
        {#if !showCreateRoom && !showJoinRoom}
          <div class="space-y-4 animate-slide-up">
            <button
              on:click={toggleCreate}
              class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all
                     shadow-md hover:shadow-lg"
            >
              Create a Room
            </button>
            
            <button
              on:click={toggleJoin}
              class="w-full py-3 px-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg
                     hover:bg-blue-50 transform hover:scale-[1.02] transition-all"
            >
              Join a Room
            </button>
          </div>
        {/if}
  
        {#if showCreateRoom}
          <div class="space-y-4 animate-slide-up">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                bind:value={username}
                placeholder="Enter your username"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all"
              />
            </div>
            <button
            on:click={handleCreateRoom}
              class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all
                     shadow-md hover:shadow-lg"
            >
              Create Room
            </button>
            <button
              on:click={() => { showCreateRoom = false; }}
              class="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
          </div>
        {/if}
  
        {#if showJoinRoom}
          <div class="space-y-4 animate-slide-up">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                bind:value={username}
                placeholder="Enter your username"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label for="room" class="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
              <input
                type="text"
                id="room"
                bind:value={room_id}
                placeholder="Enter room ID"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all"
              />
            </div>
            <button
            on:click={handleJoinRoom}
              class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all
                     shadow-md hover:shadow-lg"
            >
              Join Room
            </button>
            <button
              on:click={() => { showJoinRoom = false; }}
              class="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
          </div>
        {/if}
      </div>
    </div>
  </main>