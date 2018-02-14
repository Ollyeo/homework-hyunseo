var http = require('http');
var fs = require('fs');
var url = require('url');

var async = require('async');

var ROOT_DIR = 'client';
var messages = [];
var users = [];
var server = http.createServer(function(req, res){
    if(req.url == '/')
        req.url = '/index.html';
        
    var urlObj = url.parse(req.url, true, false);
    
    console.log(ROOT_DIR + urlObj.pathname);
    
    fs.readFile(ROOT_DIR + urlObj.pathname, (err, data) => {
        if(err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        
        res.writeHead(200);
        res.end(data);
    });
})

var socketio = require('socket.io');
var io = socketio.listen(server);

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

server.listen(8081,'0.0.0.0', () => {
    console.log('Start Server 0.0.0.0:8081');
});
