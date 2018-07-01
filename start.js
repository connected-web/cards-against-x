const express = require('express')
const fs = require('fs')
const path = require('path')
const wordList = require('./words')

const port = process.env.PORT || 12500

const app = express()
const template = fs.readFileSync('./static/card.html', 'utf8')

let serverReadyAccept, serverReadyReject
const serverReadyPromise = new Promise((accept, reject) => {
  serverReadyAccept = accept
  serverReadyReject = reject
})

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/card/:cardId', (req, res) => {
  const cardId = req.params.cardId
  console.log(`[CAX] Generating card ${cardId}`)
  const cardText = wordList[cardId]
  let cardHtml = template.replace('{{cardText}}', cardText)
  res.send(cardHtml)
})

app.listen(port, (err, success) => {
  if(err) {
    console.error(`[CAX] Unable to start server on port '${port}'`)
    return serverReadyReject(err)
  }
  console.log(`[CAX] Listening on http://localhost:${port}`)
  console.log(`[CAX] Template avaialble http://localhost:${port}/static/template.html`)
  serverReadyAccept()
})

module.exports = serverReadyPromise
