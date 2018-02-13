import { socketConnect } from 'socket.io-react';

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
  
  sendText = () => {
    const { text, socket } = this.state
    
    console.log('Sending message:', text);
    
    socket.emit('message', text);
    text = '';
  };
  
  setName = () => {
    const { name, socket } = this.state
    
    socket.emit('identify', name);
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
    const { messages, users, name, text, socket } = this.state;
    
    const { handleOnChangeName,
            handleOnIdentify,
            handleOnChangeMessage,
            handleOnSubmitMessage } = this;
    
    return (
      <div>
        <Head/>
        <ChatContainer 
          socket={socket}
          handleOnChangeName={handleOnChangeMessage}
          handleOnIdentify={handleOnIdentify}
          handleOnChangeMessage={handleOnChangeMessage}
          handleOnSubmitMessage={handleOnSubmitMessage}/>
      </div>
    );
  }
}

export default socketConnect(App);