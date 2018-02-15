import React, { Component } from 'react';
import {
  Header,
} from './components'
import { 
  ChatContainer,
  UserContainer,
} from './containers';

import io from 'socket.io-client';

class App extends Component {
  
  socket = io('http://homework-hyunseo-hyunseo.c9users.io:8081');
    
  state = {  
    messages: [ ],
    users: [ ],
    name: '',
    text: '',
    socket: this.socket
  }

  componentDidMount(){
    const { socket, messages, users, name } = this.state;
    
    // 내가 접속
    socket.on('connect', () => {
      socket.emit('identify', name);
    });
    // message 받음
    socket.on('message', (data) => {
      this.setState({
        messages: messages.concat([data])
      })
    });
    // 누군가 접속
    socket.on('user', (data) => {
      this.setState({
        users: users.concat([data])
      })
    });
  }
  
  /*
  componentDidMount() {
    const { socket } = this.state;
    
    socket.emit('user:left');
  }
  */
  
  sendText = () => {
    const { text, socket } = this.state
    
    console.log('Sending message:', text);
    
    socket.emit('message', text);
    this.setState({
      text:''
    })
  };
  
  handleOnChangeName(ev){
    this.setState({
      name: ev.target.value
    })
  }
  
  handleOnIdentify(ev){
    this.setName();
    this.setState({
      name: ''
    })
  }
  
  handleOnChangeMessage(ev){
    this.setState({
      text: ev.target.value
    })
  }
  
  handleOnSubmitMessage(ev){
    ev.preventDefault()
    this.sendText();
    
    this.setState({
      text: ''
    });
  }

  render() {
    const { users, text, messages } = this.state;
    
    const { handleOnChangeName,
            handleOnIdentify,
            handleOnChangeMessage,
            handleOnSubmitMessage } = this;
    
    return (
      <div>
        <Header/>
        <UserContainer
          users={users}
        />
        <ChatContainer
          messages={messages}
          input={text}
          handleOnChangeMessage={handleOnChangeMessage}
          handleOnSubmitMessage={handleOnSubmitMessage}/>
      </div>
    );
  }
}

export default App;