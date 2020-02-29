const wc = window.console
module.exports = {
  l: console.log.bind(wc),
  cl: console.clear.bind(wc)
}
