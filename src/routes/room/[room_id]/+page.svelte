<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    const room_id:string=page.params.room_id

    onMount(()=>{
        alert(`joined room id:${room_id}`)
    })
</script>