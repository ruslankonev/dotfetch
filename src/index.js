const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']

const handler = {
  get(target, key) {
    target.route.push(key)
    return new Proxy(target, handler)
  },

  apply: async (target, ctx, args) => {
    const [data, fetchOptions] = args
    const callinProp = target.route.slice(-1)[0]
    const isMethod = METHODS.includes(callinProp)

    if (!isMethod) {
      if (args.length > 0) {
        target.route = target.route.concat(args)
      }

      return new Proxy(target, handler)
    }

    if (!target.basePath.endsWith('/')) {
      target.basePath += '/'
    }

    let path = target.basePath + target.route.slice(0, -1).join('/')

    const callingOpts = {
      method: callinProp,
      ...target.fetchOptions,
      ...fetchOptions,
    }

    if (data) {
      if (['post', 'put', 'patch'].includes(callinProp)) {
        if (data instanceof FormData === false) {
          callingOpts.headers['Content-Type'] =
            callingOpts.headers['Content-Type'] || 'application/json'
          callingOpts.body = JSON.stringify(data)
        } else {
          callingOpts.body = data
        }
      } else {
        path += `/${data}`
      }
    }

    target.route = []

    if (target.parseJson) {
      const resp = await target.fetch(path, callingOpts)
      return resp.json()
    }

    return target.fetch(path, callingOpts)
  },
}

class Dotfetch {
  constructor(opts) {
    const rest = () => {}
    const { basePath, parseJson, ...fetchOptions } = opts
    rest.fetch = (...args) => fetch(...args)
    rest.fetchOptions = Object.assign({ headers: {} }, fetchOptions)
    rest.basePath = basePath || '/'
    rest.parseJson = parseJson
    rest.route = []

    return new Proxy(rest, handler)
  }
}

export default Dotfetch
