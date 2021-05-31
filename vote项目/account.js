const { sequelize, User, Vote, Option } = require('./db')

const express = require('express')

const accountRouter = express.Router()
module.exports = accountRouter


//{name,password,email,gender,avatar}
accountRouter.post('/register', async (req, res, next) => {
  var body = req.body
  try {
    var user = await User.create({
      ...body //展开req.body里的属性
    })
    res.end()
  } catch (e) {
    res.status(400).json(e)
  }
})

//{name,password}
accountRouter.post('/login', async (req, res, next) => {
  try {
    console.log('body', req.body)
    //登陆后获取用户信息
    var user = await User.findOne({
      attributes: ['name', 'gender', 'avatar', 'id'],
      where: {
        name: req.body.name,
        password: req.body.password
      }
    })
    //登录时下发一个cookie
    res.cookie('user', req.body.name, {
      signed: true
    })
    res.json(user.toJSON())
  } catch (e) {
    res.status(400).end(e.toString())
  }
})

//获取已登陆的用户信息
accountRouter.get('/userinfo', async (req, res, next) => {
  if (req.user) {//当前cookie对应已登陆用户
    var user = await User.findOne({
      attributes: ['name', 'gender', 'avatar', 'id'],
      where: {
        name: req.user.name,
      }
    })
    res.json(user.toJSON())
  } else {
    res.status(401).json({
      code: -1,
      msg: '用户未登陆'
    })
  }
})

accountRouter.get('/logout', async (req, res, next) => {
  res.clearCookie('user')
  res.end()
})