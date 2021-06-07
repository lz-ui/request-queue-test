import Service, { source } from './Service'

const request = (option) => {
  return function () {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      Service({
        ...option,
        cancelToken: source.token
      })
        .then(res => {
          // @ts-ignore
          resolve(res)
        })
        // @ts-ignore
        .catch(err => {
          // @ts-ignore
          reject(new Error('Error'))
        })
    })
  }
}

export default request