name: inverse
layout: true
class: center, middle, inverse
---

# きみたちやっぱりプロミスだ

---
.left[
## アジェンダ

1. プロミスってなんだろう…？
2. どうしてプロミスを使うの？
3. プロミスをつくる前に
4. プロミスをつくろう
]

---
.left[
## 1. プロミスってなんだろう…？
]

---


.left[
### Promise

```javascript
new Promise((resolve, reject) => {
  resolve(42)
})
.then(value => console.log(value))

// 42と出力される!
```

めっちゃ便利！！！

みんな！プロミスを使おう！

]
---

## おわり

---

### ...でもちょっと待って

---

### これでいいのになんでプロミスなんか使うの

.left[

```javascript
const value = 42
console.log(value)
```

もしかして詐欺！？

]

---

## もちろん詐欺ではありません！

---

## Promiseの使用状況

.left[
あのGoogleやFacebookが使っている有名な`fetch`にもPromiseは使われていて

非同期処理はPromiseを使えばまるで同期処理のように書くことができるんです！
]

---

### プロミスは計画的に使えば便利なものです

.left[
適当に使っていたら負債（技術的負債）が貯まるだけです。

なので今回はしっかりとプロミスについてご紹介します。
]

---

.left[
## 2. どうしてプロミスを使うの？
]

---

### プロミスがなかったころ

.left[
プロミスがなかったころ、人々は非同期というものに苦しめられてきました。

度重なる折り返し電話(Callback関数)により多重負債が多発し、どこからどう手をつければどういう挙動になるのか……

そういったことを理解するのが大変だったのです。

「このイベントが発動したらこの関数を1秒後に実行してその後この関数を実行してXMLRequestでリクエスト送ったあとはこの関数を……」みたいなことをずっと考えなければいけなかったのです。

]

---

### 実際にCallbackで苦しんでみよう！

---

### Demo (promiseHowToUse3)まで

---

### こたえ(Demo)

---

### プロミスを使うと何秒後に関数実行とかが簡単にかける！(Demo)

---

### プロミスでつくったものをCallbackにしてみよう(Demo)

---

### ざっくりとしたプロミスの使い方

.left[
```javascript
Promise.resolve(1)
.then(v => v * 2)
.then(v => v + 3)
.then(v => v * 4)
.then(v => console.log(v))
// 20
```
]

resolved(fulfilldともいう)されたあとに後にthenの中の関数が実行される。

---

### ざっくりとしたプロミスの使い方

.left[
```javascript
Promise.reject(1)
.then(v => v * 2)
.then(v => v + 3)
.then(v => v * 4)
.then(v => console.log(v))
.catch(e => console.log(e))
// 1
```
]

rejectedされたあとは、catchの中が使われる。

---

### ざっくりとしたプロミスの使い方

.left[
```javascript
Promise.resolve(1)
.then(v => v * 2)
.then(v => { throw 'err' })
.then(v => v * 4)
.then(v => console.log(v))
.catch(e => console.log(e))
// err
```
]

thenの中でエラーが起こったときは、catchが捉えてくれる

---

### 3. プロミスをつくる前に

---

### そもそもなんでプロミスという名前なのか？

---

### Promiseがthenやcatchをしたとき、中の関数はまだ実行されていない

.left[
```javascript
Promise.resolve(1)
.then((value) => console.log(value))
```

`Promise.resolve()`で返ってきたプロミスオブジェクトが`thenメソッド`を呼んだだけ

なのでthenの中の(value) => console.log(value)は、これが関数という認識すらされてなくて、プロミスの内部に格納されているだけ
]

---

### だから

.left[
こんなコードでも通る

```javascript
Promise.resolve(1)
.then(2)

console.log('ok')
// ちゃんとokが出力されエラーも起こらない
```
]

---

### thenして色々終わったあとに、ようやくthenの中の関数が呼ばれている

.left[
```javascript
Promise.resolve()
.then(() => console.log('2番目に呼ばれる'))
console.log('1番目に呼ばれる')
```
]

---

### プロミスの重要機能１

.left[
- プロミスは「未解決な値(pending)」という状態を持つ
- プロミスは「値が解決済み(resolved)」という状態ならthenの中の関数を実行する
- プロミスは「値が拒否された(rejected)」という状態ならcatchの中の関数を実行する

```javascript
new Promise((resolve, reject) => {
  setTimeout(resolve, 2000)
})
.then(() => console.log('resolveされたよ [=resolved]'))
```
]

---

### プロミスの重要機能２

.left[

- プロミスはプロミスをつくる(再帰)

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
})
console.log('promiseをつくった', promise)

const promiseAfterThen = promise.then(() => console.log('then内'))
console.log('then後のpromise', promiseAfterThen)
```

プロミスのチェーン

]

---

### プロミスの重要機能３

.left[

- プロミスは内部でエラーが投げられたときはそれをハンドリングしてcatchの中の関数を呼ぶ

```javascript
new Promise((resolve, reject) => {
  throw('err')
})
.then(() => console.log('呼ばれない'))
.catch(e => console.log(e))
```
]

---

### そしてなぜプロミスと呼ぶのか

.left[
- 呼び出す側は、Promiseオブジェクトを作ってthen, catchしてもらう。
- 呼び出す側は、Promiseオブジェクトの中にある一連の関数の流れに関与しなくなる
- 呼び出す側は、Promiseの中の値を取得することもできない(呼び出すタイミングで値が変わるため)※
- 「こうしてこうやってこうやっといてね」という「約束」をとりつけるようなもの


※ ただやる意味は無いけど無理矢理呼び出すことは可能

]

---

### たとえば

.left[
```javascript
new Promise((resolve, reject) => {
  console.log('洗濯が開始される')
  setTimeout(resolve, 2000)
})
.then(() => console.log('こどもが洗濯物を干す'))

console.log('お母さんは外出する')
```

約束することでお母さんは安心して外出することができる！！！！
]

---

## 4. プロミスをつくろう

---

### Demo

---
