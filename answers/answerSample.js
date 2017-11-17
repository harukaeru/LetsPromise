setTimeout(
  () => ((callback) => {
          console.log('Kaeru')
          callback()
        })(() => ((callback) => {
          console.log('Nice')
          callback()
        })(() => console.log('To'))),
  2000
)

setTimeout(
  () => ((callback) => {
          console.log('This')
          callback()
        })(() => ((callback) => {
          console.log('is')
          callback()
        })(() => ((callback) => {
          setTimeout(callback, 2000)
        })(() => ((callback) => {
          console.log('Meet')
          callback()
        })(() => console.log('You!'))))),
  1000
)

setTimeout(() => console.log(':)'), 4500)

console.log('hello!')
