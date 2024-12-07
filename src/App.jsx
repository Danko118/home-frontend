import React, { useState, useCallback, useEffect } from 'react';
import Style from './App.module.scss';
import Header from './components/header/header';
import Card from './components/card/card';

function App() {
  const socketUrl = 'ws://localhost:1884';
  const [data, setData] = useState([]);

  useEffect(() => {
      const websocket = new WebSocket(socketUrl);
      websocket.onopen = () => {
        window.dispatchEvent(new Event('websocket', { state: "connected" }));
      };
  
      websocket.onmessage = (message) => {
        setData(JSON.parse(message.data));
      };
  
      websocket.onclose = () => {
        window.dispatchEvent(new Event('websocket', { state: "disconnected" }));
      };
  
      websocket.onerror = (error) => {
        window.dispatchEvent(new Event('websocket', { state: "disconnected" }));
      };
  }, []);


  return (
    <div className={Style.app}>
      <Header />
      <div className={Style.content}>
        {data? data.map((item, index) => (
          <Card 
            key={item.id} 
            sensoreName={item.name} 
            sensoreType={item.type} 
            boardName={item.board_name} 
            sensoreValue={item.state} 
          />
        )) : null}
      </div>
    </div>
  )
}

export default App
