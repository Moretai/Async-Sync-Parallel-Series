// 带保险的异步并行执行钩子 callback
class AsyncParallelBailHookTapAsync {
  constructor() {
    this.tasks = []
  }

  asyncTap(name, task) {
    this.tasks.push(task)
  }

  asyncCall(...args) {
    let finalCallBack = args.pop()
    let i = 0
    const done = (err) => {
      if (err) {
        return finalCallBack(err)
      } else if (++i === this.tasks.length) {
        return finalCallBack()
      }
      return
    }
    for (let i = 0; i < this.tasks.length; i ++) {
      const task = this.tasks[i]
      task(...args, done)
    }
  }
}

const queue = new AsyncParallelBailHookTapAsync()

queue.asyncTap('1', function(name, callback) {
  console.log('1', name)
  callback('Wrong')
})

queue.asyncTap('2', function(name, callback) {
  console.log('2', name)
  callback()
})

queue.asyncTap('3', function(name, callback) {
  console.log('3', name)
  callback()
})

queue.asyncCall('More', (err) => {
  if (err) {
    console.log(err)
  }
  console.log('End')
})