class Promise {
  constructor(fn) {
    this.state = 'pending'
    this.currentValue = null

    this.deferred = null

    // ここも変更
    fn(this.innerResolve.bind(this), this.innerReject.bind(this))
  }

  handle(handler) {
    if (this.state === 'pending') {
      this.deferred = handler
      return
    }

    // 分岐をあたらしくつくる
    if (this.state == 'resolved') {
      if (!handler.onResolved) {
        handler.resolve(this.currentValue)
        return
      }
    } else {
      if (!handler.onRejected) {
        handler.reject(this.currentValue)
        return
      }
    }

    let ret = handler.onResolved(this.currentValue)
    handler.resolve(ret)
  }

  innerResolve(newValue) {
    if(newValue && typeof newValue.then === 'function') {
      console.log('come?')
      newValue.then(this.innerResolve.bind(this))
      return
    }

    this.currentValue = newValue
    this.state = 'resolved'

    if (this.deferred) {
      this.handle(this.deferred)
    }
  }

  innerReject(reason) {
    this.state = 'rejected'
    this.currentValue = reason

    if (this.deferred) {
      this.handle(this.deferred)
    }
  }

  then(afterThenFunc, catchFunc) {
    return new Promise((resolve, reject) =>
      this.handle({ onResolved: afterThenFunc, onRejected: catchFunc, resolve, reject })
    )
  }
}

let promise = new Promise((resolve, reject) => {
  const value = 42
  setTimeout(() => reject(value), 1000)
})

promise
  .then((value) => value + 42)
  .then((value) => new Promise(resolve => resolve(value + 35)))

console.log('---------------------')
console.log(promise)
