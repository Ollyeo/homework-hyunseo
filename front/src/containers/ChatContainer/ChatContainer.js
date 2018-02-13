import React, { Component } from 'react';

import {
    ChatBoard,
    ChatWrapper
} from '../../components';

class ChatContainer extends Component {
    
    constructor(props){
        super();
        
        const { handleOnChangeName,
                handleOnIdentify,
                handleOnChangeMessage,
                handleOnSubmitMessage
        } = this.props;
        
        
        this.state = {
                
        };
    }
    
    render() {
        
        return(
            <div className="chat-container">
                <ChatBoard/>
                <ChatWrapper/>
            </div>
        );
    }
}

export default ChatContainer;