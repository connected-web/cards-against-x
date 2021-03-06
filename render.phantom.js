/* global phantom */
/* To be run with phantomjs */
var page = require('webpage').create()

var system = require('system')
var args = system.args

/* Debug for args:
console.log('[Phantom Render] Supplied args:')
args.forEach(function(arg, i) {
  console.log(' ', i + ': ' + arg)
})
*/

function zp (num, len) {
  var result = '' + num
  while (result.length < len) {
    result = '0' + result
  }
  return result
}

var cardType = args[1]
var cardId = args[2]
var serverUrl = args[3]

var sourceUrl = serverUrl + '/card/' + cardType + '/' + cardId
var outputFilepath = './rendered/' + cardType + '-card-' + zp(cardId, 4) + '.png'

console.log('[Phantom Render] Setting up for card', zp(cardId, 4), 'from', sourceUrl)

page.open(sourceUrl, function () {
  page.render(outputFilepath)
  console.log('[Phantom Render] Rendered', outputFilepath, '(complete)')
  phantom.exit()
})
