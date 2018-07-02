const { run } = require('promise-path')
const words = require('./words')

process.env.PORT = Math.round(1000 * Math.random()) + 12000

const workItems = Object.keys(words).reduce((res, item) => {
  const newItems = createWorkItems(item, words[item])
  return res.concat(newItems)
}, [])

function createWorkItems(cardType, wordList) {
  return wordList.map((word, n) => {
    const cardId = n
    console.log(`[Render] Creating work for card ${cardId}: "${word}"`)
    return () => {
      console.log(`[Render] Working on card ${cardId}: "${word}"`)
      return run(`npm run render:x render.phantom.js ${cardType} ${cardId} http://localhost:${process.env.PORT}`)
    }
  })
}

async function processWork(workItems) {
  try {
    await require('./start')
    for(const workItem of workItems) {
      let result = await workItem()
      console.log(`[Render] Work ${workItems.indexOf(workItem)}`, result.stdout, result.stderr)
    }
    console.log('[Render] Work complete')
  }
  catch(ex) {
    console.error('[Render] Error:', ex)
  }
}

processWork(workItems)
  .then(() => process.exit())
