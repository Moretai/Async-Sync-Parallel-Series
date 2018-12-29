// 前一次的返回结果作为参数传到这一次函数里
class SyncWaterfallSync {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const [first, ...others] = this.tasks
    others.reduce((ret, task) => task(ret), first(...args))
  }
}

const queue = new SyncWaterfallSync()

queue.tap('1', function(name) {
  console.log('1', name)
  return `${name}first`
})

queue.tap('2', function(data) {
  console.log('2', data)
  return `${data}second`
})

queue.tap('3', function(data) {
  console.log('3', data)
  return `${data}third`
})

queue.call('more')