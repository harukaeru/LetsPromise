// 状態は内部にない

class Promise {
  constructor(fn) {
    this.currentValue = null
    fn(this.innerResolve.bind(this))
  }

  innerResolve(newValue) {
    this.currentValue = newValue
  }

  then(callback) {
    callback(this.currentValue)
  }
}

let promise = new Promise((resolve) => {
  const value = 42
  resolve(42)
})

promise.then((value) => console.log(value))

console.log('-------------------')
console.log(promise)
