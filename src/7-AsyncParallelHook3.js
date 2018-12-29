// 异步并行执行钩子 promise形式
class AsyncParallelHook3 {
  constructor() {
    this.tasks = []
  }

  promiseTap(name, task) {
    this.tasks.push(task)
  }

  promiseCall(...args) {
    const promises = this.tasks.map(t => t(...args))
    return Promise.all(promises)
  }
}

const queue = new AsyncParallelHook3()

console.time('async')
queue.promiseTap('1', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('1', name)
      resolve()
    }, 1000)
  })
})

queue.promiseTap('2', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('2', name)
      resolve()
    }, 2000)
  })
})

queue.promiseTap('3', function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('3', name)
      resolve()
    }, 3000)
  })
})

queue.promiseCall('More').then(() => {
  console.log('cb..')
  console.timeEnd('async') // async: 3004.164ms 取最耗时的那个
})