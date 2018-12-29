//监听函数返回true表示继续循环，返回undefine表示结束循环
class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(f => {
      let ret = true
      do {
        ret = f(...args)
      } while(ret)
    })
  }
}

const queue = new SyncLoopHook()
let q1 = 0
queue.tap('1', function(name) {
  // console.log('1', name)
  if (q1 < 4) {
    console.log('1', name)
    q1 ++
    return true
  }
  return undefined
})


let q2 = 0
queue.tap('2', function(name) {
  // console.log('1', name)
  if (q2 < 4) {
    console.log('2', name)
    q2 ++
    return true
  }
  return undefined
})

queue.call('More')