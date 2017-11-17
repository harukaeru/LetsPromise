// もっと手軽に使ってみた
Promise.resolve()
  .then(() => 1)
  .then((result) => result * 5)
  .then((result) => result * 13)
  .then((result) => console.log('Success 3:', result))
  .catch((e) => console.log('Fail:', e))
