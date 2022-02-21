<h1 style="margin-top: 2rem">
	<img src="./.github/dotfetch.svg" height="60" />
</h1>

Dot-notated api wrapper for the browser Fetch API.

## Install

```bash
npm i dotfetch
```

## Setup

```js
import Dotfetch from 'dotfetch'

const api = new Dotfetch({
  basePath: 'https://jsonplaceholder.typicode.com/',
  parseJson: true,
  headers: {
    Authorization: 'Bearer ',
  },
})
```

## Options

### Dotfetch options:

`basePath`: string — setup a base path for api-call

`parseJson`: boolean — return `response.json()` instead [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. Default `false`

### Fetch API options:

Dotfetch supports all standard Fetch API options.

## Return value

[Fetch API Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object

## Examples

```js
[api][...path][method](params)


// Make api-call request
GET: '/application/{appId}/permissions/{id}'
await api.application(appId).permissions.get(id)

// JSON-placeholder examples
GET: '/posts'
await api.posts.get()

GET: '/posts/1/comments'
await api.posts(1).comments.get()

GET: '/posts/comments/1'
await api.posts.comments.get(1)

POST: '/posts/comments'
await api.posts.comments.post({ title, postId })

PUT: '/posts/1'
await api.posts(1).put({ title, postId })

PATCH: '/posts/1'
await api.posts(1).patch({ title, postId })

DELETE: '/posts/1'
await api.posts(1).delete()
```

## License

[MIT](https://github.com/ruslankonev/dotfetch/blob/main/LICENSE)
