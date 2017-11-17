// Promiseを使ってみた
const doSomething = () => {
  return 1
}
const successCallback = (result) => {
  return result * 5
}

const successCallback2 = (result) => {
  return result * 13
}

const successCallback3 = (result) => {
  console.log('Success 3:', result)
}

const failureCallback = (e) => {
  console.log('Fail:', e)
}

Promise.resolve()
  .then(() => doSomething())
  .then((result) => successCallback(result))
  .then((result) => successCallback2(result))
  .then((result) => successCallback3(result))
  .catch((e) => failureCallback(e))
