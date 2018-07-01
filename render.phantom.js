/* To be run with phantomjs */
var page = require('webpage').create()

var sourceUrl = 'http://localhost:12500/static/card.html'
var outputFilepath = './rendered/render.png'

page.open(sourceUrl, function() {
  page.render(outputFilepath)
  phantom.exit()
})
