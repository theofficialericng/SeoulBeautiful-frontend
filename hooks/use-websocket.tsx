// app/hooks/useWebSocket.ts
import { useCallback, useEffect, useState } from 'react';

export const useWebSocket = (userId: string | undefined) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const websocket = new WebSocket(`ws://localhost:8080/api/app/chat.sendMessage`);

    websocket.onopen = () => {
      setIsConnected(true);
    };

    websocket.onclose = () => {
      setIsConnected(false);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [userId]);

  const sendMessage = useCallback((message: any) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify(message));
    }
  }, [ws, isConnected]);

  return { ws, isConnected, sendMessage };
};