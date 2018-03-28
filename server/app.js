const Koa = require('Koa')
const cors = require('koa2-cors')
const route = require('koa-route')

const app = new Koa()

app.use(cors())

const main = async (ctx, next) => {
  await next()
  ctx.response.type = 'json'
  ctx.response.body = {
    test: 'test'
  }
}

app.use(route.get('/', main))

app.listen(3000)

console.log('serve start at port 3000')
