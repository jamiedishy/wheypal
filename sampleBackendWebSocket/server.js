const server = require('server')
const { get, socket } = require('server/router')

// get server port from environment or default to 3000
const port = process.env.PORT || 3000

server({ port }, [
  get('/', ctx => '<h1>Hello you!</h1>'),
  socket('message', ctx => {
    // Send the message to every socket 
    ctx.io.emit('message', data)
  }),
  socket('removeDislikedRecommendation', ctx => {
    //   console.log(ctx.data)
    ctx.data = ctx.data.userRecommendations.filter(el => el.userID !== ctx.data.id);
    // console.log(ctx.data)
    ctx.io.emit('updateRecommendation', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    ctx.io.emit('count', {msg: 'HI U', count: Object.keys(ctx.io.sockets.sockets).length})
  })
])
  .then(() => console.log(`Server running at http://localhost:${port}`))

