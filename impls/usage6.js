new Promise((resolve, reject) => {
  setTimeout(resolve, 2000)
})
.then(() => console.log('resolveされたよ [=resolved]'))
