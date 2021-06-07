import { source } from './Service'
import Uid from './uuid'
/**
 * Your mission:
 * Create and return a request queue with the following methods.
 * Carefully read the description of each method.
 */
class RequestQueue {
  constructor( maxTask=1 ) {
    // TODO - optional, any setup you want
    this.promiseList = [];
    this.maxTask = maxTask;
    this.count = 0;
  }

  /**
   * Adds an asynchronous request to the end of the queue.
   * @param {() => Promise<any>} request - The asynchronous request.
   * @param {?Function} onExecuted - An optional callback that should be executed with the resolved
   * result of the request.
   * @returns {number} - An ID for the enqueued request.
   */
  enqueue(request, onExecuted) {
    let task = this.createTask(request, onExecuted);
    if(this.count >= this.maxTask) {
      this.promiseList.push(task);
    } else {
      // @ts-ignore
      task[0]();
    };
    // @ts-ignore
    return task[1];
  }

  createTask(request, onExecuted) {
    return [ () =>  new Promise((resolve, reject) => {
        this.count++;
        request()
          .then((res) => {
            onExecuted && onExecuted(res);
            resolve(res);
          })
          .catch(reject)
          .finally(() => {
            this.count--;
            if(this.promiseList.length) {
              let task = this.promiseList.shift();
              task[0]();
            }
          })
      }), Uid()]
  }

  /**
   * Cancels the request with the given ID.
   * @param {number} id - The ID of the request.
   */
  cancel() {
    // TODO
    source.cancel('cancel');
  }

  /**
   * Executes the next asynchronous request in the queue, resolving when the request is complete.
   * Does nothing if there are no requests left in the queue.
   * @returns {Promise<void>}
   */
  async processNext() {
    // TODO
    if (this.promiseList.length <= 0) return;
    const task = this.promiseList.shift();
    task[0]();
  }

  /**
   * Returns the current size of the queue.
   */
  getSize() {
    // TODO
    return this.promiseList.length
  }
}

export default RequestQueue;
