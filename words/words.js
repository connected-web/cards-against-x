const fs = require('fs')
const path = require('path')
const NL = '\n'

function readWords(filepath) {
  const wordText = fs.readFileSync(filepath, 'utf8')
  const wordList = wordText.split(NL).map(n => n.trim()).filter(n => n)

  return wordList
}

const wordLists = {
  'front-black': readWords(path.join(__dirname, '/black-words.txt')),
  'front-white': readWords(path.join(__dirname, '/white-words.txt')),
  'back-black': ['Cards Against X'],
  'back-white': ['Cards Against X']
}

module.exports = {
  list: (type) => { return wordLists[type] || [] },
  types: () => Object.keys(wordLists)
}
