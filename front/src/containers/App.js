import React, { Component } from 'react';
import {
  Header,
  UserList
} from './components'
import {
  ChatContainer,
} from './components'
import './App.css';

class App extends Component {
 
  constructor(props){
    super();
    
    const { socket } = this.props;
    
    this.state = {  
      messages: [ ],
      users: [ ],
      name: '',
      text: '',
      socket: socket
    }
  }

  componentDidMount(){
    
  }
  
  send = () => {
    const { text, socket } = this.state
    
    console.log('Sending message:', text);
    
    socket.emit('message', text);
    text = '';
  };
  
  setName = () => {
    const { name, socket } = this.state
    
    socket.emit('identify', name);
  };

  render() {
    const { messages, users, name, text, socket } = this.state;
    
    return (
      <div>
        <Head/>
        <ChatContainer socket={socket}/>
      </div>
    );
  }
}

export default App;