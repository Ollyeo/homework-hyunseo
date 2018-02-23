var express = require('express');
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('./front/build'));

var async = require('async');

var ROOT_DIR = 'front/build';
var messages = [];
var users = [];
// TODO :: io 에 origins: '*:*' 옵션 추가
//io.origins(['*']);
io.set('origins', ["*"]);
//io.origins(['*']);

io.on('connection', (socket) => {
    // 처음 들어왔을 때
    messages.forEach((data) => {
        socket.emit('message', data);
    });
    
    users.push(socket);
    
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket), 1);
        updateUser();
    });
    
    socket.on('message', (msg) => {
        var text = String(msg || '');
        
        if (!text)
            return;
    
        socket.get('name', (err, name) => {
           var data = {
               name: name,
               text: text
           };
           
           broadcast('message', data);
           messages.push(data);
        });
    });
    
    socket.on('identify', (name) => {
        socket.set('name', String(name || 'Anonymous'), (err) => {
            updateUser();
        })
    });
});

function updateUser(){
    async.map(
        users,
        (socket, callback) => {
            socket.get('name', callback);
        },
        (errs, names) => {
            broadcast('user', names);
        }
    );
}

function broadcast(event, data){
    users.forEach((socket) => {
        socket.emit(event, data);
    });
}

server.listen(8081, () => {
    console.log('Start Server 0.0.0.0:8081');
});
