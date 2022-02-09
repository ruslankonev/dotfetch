const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']

const handler = {
  get(target, key) {
    target.route.push(key)
    return new Proxy(target, handler)
  },

  apply(target, ctx, args) {
    const data = args[0]
    const fetchOptions = args[1]
    const callinProp = target.route.slice(-1)[0]
    const isMethod = METHODS.includes(callinProp)

    if (isMethod) {
      let path = '/' + target.route.slice(0, -1).join('/')

      const callingOptions = {
        method: callinProp,
        ...target.fetchOptions,
        ...fetchOptions,
      }

      if (data && ['post', 'put', 'patch'].includes(callinProp)) {
        callingOptions.body = JSON.stringify(data)
      } else {
        path += `/${data}`
      }

      target.route = []
      return target.fetch(path, callingOptions)
    } else {
      if (args.length > 0) {
        target.route = target.route.concat(args)
      }
      return new Proxy(target, handler)
    }
  },
}

class DotFetch {
  constructor(fetchOptions, opts) {
    const rest = () => {}
    rest.fetchOptions = fetchOptions
    rest.fetch = (...args) => fetch(...args)
    rest.route = []

    return new Proxy(rest, handler)
  }
}

export default DotFetch
