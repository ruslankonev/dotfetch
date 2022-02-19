<h1>
	<img src="./.github/dotfetch.svg" height="60" />
</h1>

Dot-notated api wrapper for the browser Fetch API.

## Install

```bash
npm i dotfetch
```

## Usage

```js
import Dotfetch from 'dotfetch'

const api = new Dotfetch({
  basePath: 'https://jsonplaceholder.typicode.com/',
  headers: {
    Authorization: 'Bearer ',
  },
})


// Api-call request
GET: '/application/2/permissions/{id}'
await api.application(2).permissions.get(id)

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

## Options

### Dotfetch options:

`basePath` — setup a base path for api-call

### Fetch API options:

Dotfetch supports all standard Fetch API options.

## License

[MIT](https://github.com/ruslankonev/dotfetch/blob/main/LICENSE)
