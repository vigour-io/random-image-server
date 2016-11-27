const fs = require('fs')
const files = fs.readdirSync('img')
const http = require('http')
const port = process.env.NOW ? 80 : 8888

http.createServer((req, res) => {
  const path = `img/${files[Math.floor(Math.random() * files.length)]}`
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Error handling: ${path}\n`)
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(data, 'binary')
    }
  })
}).listen(port)
console.log('listening on port:', port)
