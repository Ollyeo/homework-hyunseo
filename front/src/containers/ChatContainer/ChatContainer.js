import React, { Component } from 'react';

import {
    ChatBoard,
    ChatWrapper
} from '../../components';

class ChatContainer extends Component {
    
    render() {
        const { messages,
                input,
                handleOnChangeMessage,
                handleOnSubmitMessage
        } = this.props;
        
        return(
            <div className="chat-container">
                <ChatBoard messages={messages}/>
                <ChatWrapper
                    value={input}
                    onChange={handleOnChangeMessage}
                    onKeyPress={handleOnSubmitMessage}
                    onSubmit={handleOnSubmitMessage}
                />
            </div>
        );
    }
}

export default ChatContainer;