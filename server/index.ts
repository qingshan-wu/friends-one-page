import Koa from 'koa'
import Router from 'koa-router'
import mongoose from 'mongoose'

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27017/calendar-db')
const daySchema = new mongoose.Schema({
  date: String,
  lunisolar: String,
  img: Buffer,
  slogan: String,
  good: String,
  bad: String,
  memo: String,
})

const Day = mongoose.model('Day', daySchema)

const app = new Koa()
const date = new Router({
  prefix: '/date',
})

// 定义一个简单的路由
date.post('/update', async (ctx) => {
  const demoDay = new Day({
    date: 'demoxx',
    lunisolar: '例子',
    img: 'xxx',
    slogan: '标语',
    good: '宜',
    bad: '忌',
    memo: '备注',
  })
  demoDay
    .save()
    .catch(console.error)
    .finally(() => {
      console.log('copy that! already writed. over')
    })
  ctx.body = 'Hello, World! xx'
})

app.use(date.routes()).use(date.allowedMethods())

app.listen(3000, () => {
  console.log('Server is running on port 3000. over')
})
