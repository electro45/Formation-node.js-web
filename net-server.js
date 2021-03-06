const net = require('net');

const server = net.createServer();
server.on('connection', (socket) => {
  socket.pipe(process.stdout);
  socket.write('HTTP/1.1 200 OK\r\n');
  socket.write('Content-Type: text/plain\r\n');
  socket.write('\r\n');
  socket.write('Hello!!\r\n');
  socket.end(); // OBLIGATOIRE
});

server.on('error', (err) => {
  console.log(err.message);
});

server.once('listening', () => {
  console.log('Server started : http://127.0.0.1:8080');
});

server.listen(8080);
