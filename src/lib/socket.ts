let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
    if (!socket || socket.readyState == WebSocket.CLOSED) {
        socket = new WebSocket("ws://localhost:8080")

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onclose = () => {
            console.log("❌ WebSocket closed");
            socket = null;
        };

        socket.onerror = (err) => {
            console.error("❗ WebSocket error:", err);
        };
    }
    return socket
}