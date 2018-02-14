import React from 'react'

const ChatBoard = ({texts}) => {
    // append text
    const chatlist = texts.map(
        ({name, text}) => (
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th class="span2">Name</th>
                        <th class="span7">Text</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="msg in messages">
                        <td class="span2" ng-bind="msg.name"></td>
                        <td class="span7" ng-bind="msg.text"></td>
                    </tr>
                </tbody>
            </table>
        )
    );
    
    return (
        <div className='chat-board'>
            {chatlist}
        </div>
    );
}

export default ChatBoard;