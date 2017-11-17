const promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
})
console.log('promiseをつくった', promise)

const promiseAfterThen = promise.then(() => console.log('then内'))
console.log('then後のpromise', promiseAfterThen)
