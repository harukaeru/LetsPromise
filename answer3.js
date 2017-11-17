// ３重Callback
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

const successCallback2 = (result, successCb3, failureCb) => {
  try {
    const nextResult = result * 13
    successCb3(nextResult)
  } catch (e) {
    failureCb(e)
  }
}

const successCallback3 = (result) => {
  console.log('Success 3:', result)
}

const failureCallback = (e) => {
  console.log('Fail:', e)
}

doSomething(
  (result) => successCallback(
    result, (result) => successCallback2(result, successCallback3, failureCallback), failureCallback
  ),
  failureCallback
)
