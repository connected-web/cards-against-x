const fs = require('fs')
const path = require('path')
const NL = '\n'

function readWords(filepath) {
  const wordText = fs.readFileSync(filepath, 'utf8')
  const wordList = wordText.split(NL).map(n => n.trim()).filter(n => n)

  return wordList
}

module.exports = {
  black: readWords(path.join(__dirname, '/words/black-words.txt')),
  white: readWords(path.join(__dirname, '/words/white-words.txt'))
}
