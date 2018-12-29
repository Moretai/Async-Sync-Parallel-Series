// 异步并行执行钩子 callback形式
class AsyncParallelHook2 {
  constructor() {
    this.tasks = []
  }

  asyncTap(name, task) {
    this.tasks.push(task)
  }

  asyncCall(...args) {
    const cb = args.pop()
    let i = 0, length = this.tasks.length
    function done() {
      if (++i === length) {
        cb()
      }
    }
    this.tasks.forEach(f => f(...args, done))
  }
}

const queue = new AsyncParallelHook2()

console.time('async')
queue.asyncTap('1', function(name, callback) {
  setTimeout(() => {
    console.log('1', name)
    callback()
  }, 1000)
})

queue.asyncTap('2', function(name, callback) {
  setTimeout(() => {
    console.log('2', name)
    callback()
  }, 2000)
})

queue.asyncTap('3', function(name, callback) {
  setTimeout(() => {
    console.log('3', name)
    callback()
  }, 3000)
})

queue.asyncCall('More', function() {
  console.log('cb..')
  console.timeEnd('async') // async: 3004.529ms 取最耗时的那个
})