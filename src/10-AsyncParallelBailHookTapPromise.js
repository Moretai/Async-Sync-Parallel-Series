// 带保险的异步并行执行钩子 promise
class AsyncParallelBailHookTapPromise {
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

const queue = new AsyncParallelBailHookTapPromise()

console.time('cost')
queue.promiseTap('1', function(name) {
  return new Promise(function(resolve, reject) {
   setTimeout(() => {
      console.log('1', name)
      resolve()
   }, 1000) 
  })
})

queue.promiseTap('2', function(name) {
  return new Promise(function(resolve, reject) {
   setTimeout(() => {
      console.log('2', name)
      reject('Oops~something error')
   }, 2000) 
  })
})

queue.promiseTap('3', function(name, callback) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
       console.log('3', name)
       resolve()
    }, 3000) 
   })
})

queue.promiseCall('More').then(() => {
  console.timeEnd('cost')
  console.log('all ok')
}, (err) => {
  console.log('err=>', err)
  console.timeEnd('cost');
})