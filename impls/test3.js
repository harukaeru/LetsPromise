class Promise {
  constructor(fn) {
    this.state = 'pending'
    this.currentValue = null

    // 実行が延期された関数を格納する
    this.deferred = null

    fn(this.innerResolve.bind(this))
  }

  handle(handler) {
    // handlerには onResolvedとresolveが入っている

    // ここはほぼおなじ
    if (this.state === 'pending') {
      this.deferred = handler
      return
    }

    // thenの中の関数がなければ、もうresolveしちゃう
    if (!handler.onResolved) {
      handler.resolve(this.currentValue)
      return
    }

    let ret = handler.onResolved(this.currentValue)
    handler.resolve(ret)
  }

  innerResolve(newValue) {
    // 渡される値がthenという属性を持っていたらPromiseとして扱う
    if(newValue && typeof newValue.then === 'function') {
      // promiseのthenを使い解決を待つ
      newValue.then(this.innerResolve.bind(this))
      return
    }

    this.currentValue = newValue
    this.state = 'resolved'

    // 実行を延期された関数があれば実行する
    if (this.deferred) {
      this.handle(this.deferred)
    }
  }

  then(afterThenFunc) {
    return new Promise((resolve) =>
      this.handle({ onResolved: afterThenFunc, resolve })
    )
  }
}

let promise = new Promise((resolve) => {
  const value = 42
  setTimeout(() => resolve(value), 1000)
})

promise
  .then((value) => value + 42)
  .then((value) => new Promise(resolve => resolve(value + 35)))
  .then((value) => console.log(value))

console.log('---------------------')
console.log(promise)
