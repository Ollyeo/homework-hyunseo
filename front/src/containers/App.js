import React, { Component } from 'react';
import {
  Header
} from './components'
import './App.css';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io';

class App extends Component {
  socket =  io.connect();
  
  state = {
    messages : [ ],
    users : [ ],
    name : '',
    text : '',
  };
  
  socket.on('connect', () => {
    this.setName();
  });
  
  socket.on('message', function (msg) {
    messages.push(msg);
    socket.on('connect', function () {
      setName();
    });
  });
  
  socket.on('message', function (msg) {
    messages.push(msg);
  });
  
  socket.on('user', function (names) {
    roster = names;
    // 수정
    $('#localusers').append($('<li class="collection-item">' + names + '</li>'))
  });
  
  function send() {
    console.log('Sending message:', $scope.text);
    socket.emit('message', $scope.text);
    text = '';
  };
  
  function setName() {
    socket.emit('identify', $scope.name);
  };

  render() {
    return (
      <div className="App">
      <SocketProvider socket={socket}>
      
      </SocketProvider>
      </div>
    );
  }
}

export default App;