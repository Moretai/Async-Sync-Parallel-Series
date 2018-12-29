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
    const next = () => {
      const task = this.tasks[i++]
      if (i > this.tasks.length) {
        return finalCb()
      }
      if (task) {
        task(...args, next)
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
      next()
   }, 1000) 
})

queue.tap('2', function(name, next) {
  setTimeout(() => {
     console.log('2', name)
     next()
  }, 2000) 
})

queue.tap('3', function(name, next) {
  setTimeout(() => {
     console.log('3', name)
     next()
  }, 3000) 
})

queue.call('More', () => {
  console.log('all finish')
  console.timeEnd('cost')
})