const { sequelize, User, Vote, Option } = require('./db')
const cors = require('cors')//跨域

const express = require('express')
const cookieParser = require('cookie-parser')
const accountRouter = require('./account')
const voteRouter = require('./vote')
const formidable = require('formidable')
const path = require('path')

const app = express()
const PORT = 3500
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(cors({
  origin: true,
  maxAge: 999999,
  credentials: true,
}))
app.use(express.json())//接受json提交
app.use(cookieParser('secret'))
//通过cookie从数据库中查询用户
app.use(async (req, res, next) => {
  if (req.signedCookies.user) {
    req.user = await User.findOne({
      where: {
        name: req.signedCookies.user
      }
    })
  } else {
    req.user = null
  }
  next()
})

app.use('/', express.static(path.join(__dirname, './build')))
app.use('/account', accountRouter)//挂载路由到对应路径 
app.use('/vote', voteRouter)


app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))

app.post('/upload', async (req, res) => {
  const form = formidable({
    multiples: false,//不允许上传多个
    keepExtensions: true,//保留扩展名
    uploadDir: path.join(__dirname, 'uploads')//上传路径
  })

  form.parse(req, async (err, info, files) => {
    if (err) {
      next(err)
    } else {
      res.json({
        url: '/uploads/' + path.basename(files.file.path)
      })
    }
  })
})

const { server, io } = require('./servers')

server.on('request', app)//处理正常请求


io.attach(server, { serveClient: false })//一定程度接管server功能，false表示不接管

server.listen(PORT, () => {
  console.log('listening on port', PORT)
})