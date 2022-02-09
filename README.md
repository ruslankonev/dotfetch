<h1>
	<img src="./.github/dotfetch.svg" height="60" />
</h1>

Dot-notated api wrapper over the fetch function.

## Install

```bash
npm i dotfetch
```

## Usage

```js
import DotFetch from 'dotfetch'

const api = new DotFetch({
  headers: {
    Authorization: 'Bearer ',
  },
})

// Example of api-call requests

GET: '/application/2/permissions/{id}'
await api.application(2).permissions.get(id)


// Other variants

await api.application(2).permissions.post({ title, alias })
await api.application(2).permissions.update({ title, alias })
await api.application(2).permissions.delete(id)
```

## License

[MIT](https://github.com/ruslankonev/dotfetch/blob/main/LICENSE)
