import React, { useState, useCallback, useEffect } from 'react';
import Style from './App.module.scss';
import Header from './components/header/header';
import Card from './components/card/card';
import {websocketConnect, websocketSend} from './utils/websocket';

function App() {
  const [data, setData] = useState([]);
  const [webSocket, setWebsocket] = useState('');

  useEffect(() => {
    websocketConnect(webSocket, setWebsocket);
  }, []);

  window.addEventListener('websocket', (message) => {
    if (message.detail === 'connected') {
      websocketSend(webSocket, {"type":'sensors-refresh',"data":''});
    }
  })

  window.addEventListener('websocket-data', (message) => {
    setData(JSON.parse(message.detail));
  })

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
            sensoreValue={item.value} 
          />
        )) : null}
      </div>
      <button onClick={() => websocketConnect(webSocket, setWebsocket)}>Обновить подключение</button>
      <button onClick={() => websocketSend(webSocket, {type:'sensors-refresh',data:''})}>Отправить сообщение</button>
    </div>
  )
}

export default App
