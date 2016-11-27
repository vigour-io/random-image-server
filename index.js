const files = require('fs').readdirSync('img')
const sharp = require('sharp')
const http = require('http')
const port = process.env.NOW ? 80 : 8888

http.createServer((req, res) => {
  const path = `img/${files[Math.floor(Math.random() * files.length)]}`
  sharp(path)
    .resize(400)
    .toBuffer()
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(data, 'binary')
    }).catch(e => {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Error handling: ${path}\n`)
    })
}).listen(port)
console.log('listening on port:', port)
