new Promise((resolve, reject) => {
  throw('err')
})
.then(() => console.log('呼ばれない'))
.catch(e => console.log(e))
