Promise.resolve(1)
.then(v => v * 2)
.then(v => v + 3)
.then(v => v * 4)
.then(v => console.log(v))