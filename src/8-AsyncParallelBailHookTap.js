// 带保险的异步并行执行钩子
class AsyncParallelBailHookTap {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let callback = args.pop()
    for (let i = 0; i < this.tasks.length ; i ++) {
      const task = this.tasks[i]
      const ret = task(...args)
      // ret has value, just stop functions call
      if (ret) return callback(ret)
    }
  }
}

const queue = new AsyncParallelBailHookTap()

queue.tap('1', function(name) {
  console.log('1', name)
  return "Wrong"
})

queue.tap('2', function(name) {
  console.log('2', name)
  return "Wrong"
})

queue.tap('3', function(name) {
  console.log('3', name)
})

queue.call('More', (err) => {
  if (err) {
    console.log(err)
  }
  console.log('End')
})