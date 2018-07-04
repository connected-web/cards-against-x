const express = require('express')
const fs = require('fs')
const path = require('path')
const words = require('./words/words')

const port = process.env.PORT || 12500

const app = express()
const cardTemplateFront = fs.readFileSync('./static/card-front.html', 'utf8')
const cardTemplateBack = fs.readFileSync('./static/card-back.html', 'utf8')

let serverReadyAccept, serverReadyReject
const serverReadyPromise = new Promise((accept, reject) => {
  serverReadyAccept = accept
  serverReadyReject = reject
})

const cardTemplates = {
  frontBlack: cardTemplateFront,
  frontWhite: cardTemplateFront,
  backBlack: cardTemplateBack,
  backWhite: cardTemplateBack
}

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/card/:cardType/:cardId', (req, res) => {
  const cardId = req.params.cardId
  const cardType = req.params.cardType
  const template = cardTemplates[cardType]
  console.log(`[CAX] Generating card ${cardId}`)
  try {
    const cardText = words.list(cardType)[cardId]
    let cardHtml = template
      .replace('{{cardText}}', cardText)
      .replace('{{cardType}}', cardType)
    res.send(cardHtml)
  }
  catch (ex) {
    res.send(`[CAX] Unknown card:` + JSON.stringify({cardType, cardId}))
  }
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
