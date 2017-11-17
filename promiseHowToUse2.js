// ２重コールバック
const doSomething = (successCb, failureCb) => {
  try {
    const result = 1
    successCb(result)
  } catch (e) {
    failureCb(e)
  }
}
const successCallback = (result, successCb2, failureCb) => {
  try {
    const nextResult = result * 5
    successCb2(nextResult)
  } catch (e) {
    failureCb(e)
  }
}

const successCallback2 = (result) => {
  console.log('Success 2:', result)
}

const failureCallback = (e) => {
  console.log('Fail:', e)
}

doSomething((result) => successCallback(result, successCallback2, failureCallback), failureCallback)
