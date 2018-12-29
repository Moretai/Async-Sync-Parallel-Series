// 异步并行执行钩子
class AsyncParallelHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  asyncCall(...args) {
    const cb = args.pop()
    this.tasks.forEach(f => f(...args))
    cb()
  }
}

const queue = new AsyncParallelHook()

console.time('async')
queue.tap('1', function(name) {
  // 里面还是同步的代码
  console.log('1', name)
})

queue.tap('2', function(name) {
  console.log('2', name)
})

queue.tap('3', function(name) {
  console.log('3', name)
})

queue.asyncCall('More', function() {
  console.log('cb..');
  console.timeEnd('async')
})