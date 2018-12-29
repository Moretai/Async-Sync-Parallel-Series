// 串行同步执行,不关心返回值
class SyncHook {
  constructor() {
    this.task = []
  }

  queue(name, task) {
    this.task.push(task)
  }

  call(...args) {
    this.task.forEach(f => f(...args))
  }
}

const q = new SyncTab()

q.queue('1', function(a) {
  console.log('1',a)
})

q.queue('2', function(a) {
  console.log('2',a)
})

q.queue('3', function(a) {
  console.log('3',a)
})

q.call('more')
