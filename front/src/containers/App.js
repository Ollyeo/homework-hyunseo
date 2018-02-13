import React, { Component } from 'react';
import {
  Header
} from './components'
import './App.css';

import { SocketProvider } from 'socket.io-react';
import { socketConnect } from 'socket.io-react'
import io from 'socket.io';

class App extends Component {
  
  socket =  io.connect();
  
  state = {
    messages: [ ],
    users: [ ],
    name: '',
    text: '',
  };
  
  constructor(props){
    super(props);
      
    this.socket.on('connect', () => {
      this.setName();
    });
  
    this.socket.on('message', function (msg) {
      const { messages } = this.state
      
      this.setState({
        messages : messages.concat(msg)
      })

    });
    
    this.socket.on('message', function (msg) {
      const { messages } = this.state
      this.setState({
        messages : messages.concat(msg)
      })
    });
    
    this.socket.on('user', function (names) {
      this.setState({
        users: names
      });
      // 수정
      $('#localusers').append($('<li class="collection-item">' + names + '</li>'))
    });
  
  }

  send = () => {
    const { text } = this.state
    
    console.log('Sending message:', text);
    
    this.socket.emit('message', text);
    this.text = '';
  };
  
  setName = () => {
    const { name } = this.state
    this.socket.emit('identify', name);
  };

  render() {
    return (
      <div className="App">
      <SocketProvider socket={this.socket}>
      
      </SocketProvider>
      </div>
    );
  }
}

export default App;