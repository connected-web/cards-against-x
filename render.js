const { run, clean } = require('promise-path')
const words = require('./words/words')

process.env.PORT = Math.round(1000 * Math.random()) + 12000

const workItems = words.types().reduce((res, type) => {
  const newItems = createWorkItems(type, words.list(type))
  return res.concat(newItems)
}, [])

function createWorkItems (cardType, wordList) {
  return wordList.map((word, n) => {
    const cardId = n
    console.log(`[Render] Creating work for card ${cardId}: "${word}"`)
    return () => {
      console.log(`[Render] Working on card ${cardId}: "${word}"`)
      return run(`npm run render:x render.phantom.js ${cardType} ${cardId} http://localhost:${process.env.PORT}`)
    }
  })
}

const dd = (ms) => `${(ms / 1000)} s`

async function processWork (workItems) {
  const times = [Date.now()]
  try {
    await require('./local-server')
    for (const workItem of workItems) {
      const result = await workItem()
      times.push(Date.now())
      const timeTaken = times[times.length - 1] - times[times.length - 2]
      console.log(`[Render] Work item ${workItems.indexOf(workItem)}`, result.stdout, result.stderr, dd(timeTaken))
    }
    console.log('[Render] Work complete', workItems.length, 'items in', dd(Date.now() - times[0]))
  } catch (ex) {
    console.error('[Render] Error:', ex)
  }
}

clean('./rendered/*.png')
  .then(() => processWork(workItems))
  .then(() => process.exit())
