// 带异步串行执行钩子
class AsyncSeriesBailHookTapAsync {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const finalCb = args.pop()
    let i = 0
    const next = (err, data) => {
      if (err) {
        return finalCb(err)
      } else {
        const task = this.tasks[i++]
        if (task) {
          i === 1 ? task(...args, next) : task(data, next)
        } else {
          finalCb(null, data)
        }
      }
    }

    next()
  }
}

const queue = new AsyncSeriesBailHookTapAsync()

console.time('cost')
queue.tap('1', function(name, next) {
   setTimeout(() => {
      console.log('1', name)
      next(null, 'pass 1')
   }, 1000) 
})

queue.tap('2', function(name, next) {
  setTimeout(() => {
     console.log('2', name)
     next(null, 'pass 2')
  }, 2000) 
})

queue.tap('3', function(name, next) {
  setTimeout(() => {
     console.log('3', name)
     next(null, 'pass 3')
  }, 3000) 
})

queue.call('More', (err, data) => {
  console.log(err, data)
  console.log('all finish')
  console.timeEnd('cost')
})