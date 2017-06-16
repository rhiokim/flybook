/* global hljs */
window.addEventListener('load', () => {
  document.querySelectorAll('pre>code').forEach(block => {
    hljs.highlightBlock(block)
  })
})
