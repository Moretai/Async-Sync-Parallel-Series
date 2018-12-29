// 带异步串行执行钩子 promise
class AsyncSeriesBailHookTapPromise {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  promiseCall(...args) {
    const [first, ...tasks] = this.tasks
    const promises = tasks.reduce((a ,b) => {
      const t = a.then((c) => b(c))
      console.log(t)
      return t
    }, first(...args))
    return Promise.resolve(promises)
  }
}

const queue = new AsyncSeriesBailHookTapPromise()

console.time('cost')
queue.tap('1', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log('1', name)
      resolve('pass 1')
    }, 1000)
  })
})

queue.tap('2', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log('2', name)
      resolve('pass 2')
    }, 2000)
  })
})

queue.tap('3', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log('3', name)
      resolve('pass 3')
    }, 3000)
  })
})

queue.promiseCall('More').then((data) => {
  console.log('All ok', data)
  console.timeEnd('cost')
})