const wait = time => new Promise(resolve => setTimeout(resolve, time))

wait(2000).then(() => {
  console.log('Kaeru!!')
})
  .then(() => console.log('Nice'))
  .then(() => console.log('To'))

wait(1000).then(() => {
  console.log('This')
})
  .then(() => console.log('is'))
  .then(() => {
    wait(2000)
      .then(() => console.log('Meet'))
      .then(() => console.log('You!'))
  })

wait(4500).then(() => console.log(':)'))

console.log('hello!')
