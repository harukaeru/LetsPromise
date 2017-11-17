new Promise((resolve, reject) => {
  console.log('洗濯が開始される')
  setTimeout(resolve, 2000)
})
.then(() => console.log('こどもが洗濯物を干す'))

console.log('お母さんは外出する')
