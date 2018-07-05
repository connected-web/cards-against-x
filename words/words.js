const fs = require('fs')
const path = require('path')

const project = require('../package.json')
const cardTemplateFront = fs.readFileSync(path.join(__dirname, '../static/card-front.html'), 'utf8')
const cardTemplateBack = fs.readFileSync(path.join(__dirname, '../static/card-back.html'), 'utf8')

const NL = '\n'

function readWords (filepath) {
  const wordText = fs.readFileSync(filepath, 'utf8')
  const wordList = wordText.split(NL).map(n => n.trim()).filter(n => n)

  return wordList
}

const wordLists = {
  'front-black-pick1': {
    words: readWords(path.join(__dirname, '/black-words-pick1.txt')),
    classes: ['front', 'black', 'pick1'],
    template: cardTemplateFront
  },
  'front-black-pick2': {
    words: readWords(path.join(__dirname, '/black-words-pick2.txt')),
    classes: ['front', 'black', 'pick2'],
    template: cardTemplateFront
  },
  'front-black-pick3': {
    words: readWords(path.join(__dirname, '/black-words-pick3.txt')),
    classes: ['front', 'black', 'pick3'],
    template: cardTemplateFront
  },
  'front-white': {
    words: readWords(path.join(__dirname, '/white-words.txt')),
    classes: ['front', 'white'],
    template: cardTemplateFront
  },
  'back-black': {
    words: [project.title],
    classes: ['back', 'black'],
    template: cardTemplateBack
  },
  'back-white': {
    words: [project.title],
    classes: ['back', 'white'],
    template: cardTemplateBack
  }
}

function get (type) {
  return wordLists[type] || {}
}

function list (type) {
  return get(type).words || []
}

module.exports = {
  get,
  list,
  types: () => Object.keys(wordLists)
}
