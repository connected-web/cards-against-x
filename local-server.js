const express = require('express')
const path = require('path')

const words = require('./words/words')
const project = require('./package.json')

const port = process.env.PORT || 12500

const app = express()

let serverReadyResolve, serverReadyReject
const serverReadyPromise = new Promise((resolve, reject) => {
  serverReadyResolve = resolve
  serverReadyReject = reject
})

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/card/:cardType/:cardId', (req, res) => {
  const cardId = req.params.cardId
  const cardType = req.params.cardType
  console.log(`[CAX] Generating card ${cardType} ${cardId}`)
  try {
    const wordGroup = words.get(cardType)
    const template = wordGroup.template
    const cardText = words.list(cardType)[cardId]
    const cardHtml = template
      .replace(/{{cardText}}/g, cardText)
      .replace(/{{cardType}}/g, cardType)
      .replace(/{{cardClasses}}/g, wordGroup.classes.join(' '))
      .replace(/{{projectTitle}}/g, project.title)
    res.send(cardHtml)
  } catch (ex) {
    res.send('[CAX] Unknown card:' + JSON.stringify({ cardType, cardId }))
  }
})

app.listen(port, (err, success) => {
  if (err) {
    console.error(`[CAX] Unable to start server on port '${port}'`)
    return serverReadyReject(err)
  }
  console.log(`[CAX] Listening on http://localhost:${port}`)
  console.log('[CAX] Card previews available on:')
  words.types().forEach(type => {
    console.log(`[CAX]   http://localhost:${port}/card/${type}/0`)
  })
  serverReadyResolve()
})

module.exports = serverReadyPromise
