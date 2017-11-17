class Promise {
  constructor(fn) {
    this.state = 'pending'
    this.currentValue = null

    // 実行が延期された関数を格納する
    this.deferred = null

    fn(this.innerResolve.bind(this))
  }

  handle(onResolved) {
    // 現在の状態がpendingならthenの中の関数の実行は延期する
    if (this.state === 'pending') {
      this.deferred = onResolved
      return
    }

    // pendingじゃないならthenの中の関数をすぐに実行する
    onResolved(this.currentValue)
  }

  innerResolve(newValue) {
    this.currentValue = newValue
    this.state = 'resolved'

    // 実行を延期された関数があれば実行する
    if (this.deferred) {
      this.handle(this.deferred)
    }
  }

  then(afterThenFunc) {
    this.handle(afterThenFunc)
  }
}

let promise = new Promise((resolve) => {
  // setTimeout(() => resolve(42), 1000)
  const value = 42
  resolve(value)
})

promise.then((value) => console.log(value))

console.log('---------------------')
console.log(promise)













/*
 メモ用

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

wait(5000).then(() => console.log('5秒後に出力されるよ'))
*/
