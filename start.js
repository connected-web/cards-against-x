const express = require('express')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 12500

const app = express()
const template = fs.readFileSync('./static/template.html', 'utf8')

app.use('/static', express.static(path.join(__dirname, 'static')))

app.listen(port, (err, success) => {
  console.log(`[CAX] Listening on http://localhost:${port}`)
  console.log(`[CAX] Template avaialble http://localhost:${port}/static/template.html`)
})
