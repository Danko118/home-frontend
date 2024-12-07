import { socketUrl } from "./utils";

export function websocketConnect(webSocket, setWebsocket) {
    if (webSocket) {
      webSocket.close();
    }
    const websocket = new WebSocket(socketUrl);
    setWebsocket(websocket);
    websocket.onopen = () => {
      window.dispatchEvent(new CustomEvent('websocket', { detail: "connected" }));
    };

    websocket.onmessage = (message) => {
        window.dispatchEvent(new CustomEvent('websocket-data', { detail: message.data }));
    };

    websocket.onclose = () => {
      window.dispatchEvent(new CustomEvent('websocket', { detail: "disconnected" }));
    };

    websocket.onerror = (error) => {
      window.dispatchEvent(new CustomEvent('websocket', { detail: "disconnected" }));
    };
  }

export function websocketSend(webSocket, message) {
    if (!webSocket) {
      return;
    }
    webSocket.send(JSON.stringify(message));
}