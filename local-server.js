const express = require('express')
const fs = require('fs')
const path = require('path')

const words = require('./words/words')
const project = require('./package.json')

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
  'front-black-pick1': cardTemplateFront,
  'front-black-pick2': cardTemplateFront,
  'front-black-pick3': cardTemplateFront,
  'front-white': cardTemplateFront,
  'back-black': cardTemplateBack,
  'back-white': cardTemplateBack
}

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/card/:cardType/:cardId', (req, res) => {
  const cardId = req.params.cardId
  const cardType = req.params.cardType
  const template = cardTemplates[cardType]
  console.log(`[CAX] Generating card ${cardId}`)
  try {
    const wordGroup = words.get(cardType)
    const cardText = words.list(cardType)[cardId]
    let cardHtml = template
      .replace(/{{cardText}}/g, cardText)
      .replace(/{{cardType}}/g, cardType)
      .replace(/{{cardClasses}}/g, wordGroup.classes.join(' '))
      .replace(/{{projectTitle}}/g, project.title)
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
