const http = require('http');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write('Hello Http');
      res.end(); // OBLIGATOIRE
      break;
    case '/api/user':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({user: 'neo'}));
      res.end(); // OBLIGATOIRE
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.write('Error 404');
      res.end(); // OBLIGATOIRE
  }

});

// server.on('request', (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('Hello Http');
//   res.end();
// });

server.on('error', (err) => {
  console.log(err.message);
});

server.listen(8080, () => {
  console.log('Server started : http://127.0.0.1:8080');
});
