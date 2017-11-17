// エラーだけ返すようになった
const doSomething = () => {
  try {
    const result = 1
    throw 'foo'
    console.log('Success:', result)
  } catch (e) {
    console.log('Fail:', e)
  }
}

doSomething()
