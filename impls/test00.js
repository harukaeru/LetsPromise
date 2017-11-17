// 状態をつくった

class Promise {
  constructor(fn) {
    this.state = 'pending'
    this.currentValue = null
    fn(this.innerResolve.bind(this))
  }

  innerResolve(newValue) {
    // 呼び出し側でresolveすると呼ばれるメソッド
    this.currentValue = newValue
    this.state = 'resolved'
  }

  then(afterThenFunc) {
    afterThenFunc(this.currentValue)
  }
}

let promise = new Promise((resolve) => {
  const value = 42
  resolve(value)
})

promise.then((value) => console.log(value))

console.log('-------------------')
console.log(promise)
