// Callbackを導入してみた
const doSomething = (successCb, failureCb) => {
  try {
    const result = 1
    successCb(result)
  } catch (e) {
    failureCb(e)
  }
}
const successCallback = (result) => {
  console.log('Success:', result)
}

const failureCallback = (e) => {
  console.log('Fail:', e)
}

doSomething(successCallback, failureCallback)
