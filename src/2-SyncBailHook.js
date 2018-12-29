// 串行同步执行，有一个返回值不为null则跳过剩下的逻辑
class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {

    let i= 0, ret;
    do {
      // console.log(this.tasks);
      // console.log(ret);
      // console.log(i);
      
      ret = this.tasks[i++](...args)
    } while (!ret && i < this.tasks.length)
  }
}

const queue = new SyncBailHook()

queue.tap('1', function(a) {
  console.log('1',a)
  // return 'm'
})

queue.tap('2', function(a) {
  console.log('2',a)
  // return 'm2'
})

queue.tap('3', function(a) {
  console.log('3',a)
})

queue.call('More')