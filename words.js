const fs = require('fs')

const NL = '\n'
const wordFile = './card-words.txt'
const wordText = fs.readFileSync(wordFile, 'utf8')
const wordList = wordText.split(NL).map(n => n.trim()).filter(n => n)

module.exports = wordList
