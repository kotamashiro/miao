const { sequelize, User, Vote, Option } = require('./db')
const express = require('express')
const { io } = require('./servers')

const voteRouter = express.Router()
module.exports = voteRouter


io.on('connection', socket => {//socket.io连接对象
  console.log('someone comes')
  socket.on('select room', id => {
    var room = 'vote' + id
    socket.join(room)
    console.log('join', room)
  })
})

//GET /vote/get/5
voteRouter.get('/get/:id', async (req, res, next) => {
  var vote = await Vote.findByPk(req.params.id)
  if (vote) {
    res.json({
      vote: vote.toJSON(),
      // options: await vote.getOptions({ include: [User] })
      options: await Option.findAll({
        where: { VoteId: req.params.id },
        include: [{
          model: User,
          attributes: ['name', 'gender', 'avatar', 'id'],
        }]
      })
    })
  } else {
    res.status(404).json({
      code: -1,
      msg: '不存在这个投票'
    })
  }
})


//判断登陆状态，未登陆不允许执行后续操作
voteRouter.use(async (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({
      code: -1,
      msg: '未登陆'
    })
  }
})
//POST /vote/
/** 请求体:
   {title,
    desc,
    deadline,
    option:['ss','xx']
   }
 **/
voteRouter.post('/create', async (req, res, next) => {
  var { options, ...body } = req.body

  try {
    var vote = await Vote.create(body)//build为同步方法,与create不同
    vote.setUser(req.user)//当前登陆用户

    var ary = await Promise.all(options.map(str => {
      return Option.create({
        content: str,
      })
    }))
    vote.addOptions(ary)
    res.json(vote.toJSON())
  } catch (e) {
    res.status(400).json(e.toString())
  }

})


//投票
// post /vote/voteup/5
voteRouter.post('/voteup/:optionId', async (req, res, next) => {

  var option = await Option.findByPk(req.params.optionId, { include: Vote })
  if (option) {//选项存在
    if (option.Vote.deadline.getTime() > Date.now()) {//没过期
      if (option.Vote.multiSelect) {//多选
        await option.addUser(req.user)
      } else {//单选,需要删除当前用户对当下问题投的其他票
        var thisVoteOptions = await Option.findAll({//注意这个await不写就不能实现单选
          where: {
            VoteId: option.Vote.id
          }
        })
        await req.user.removeOptions(thisVoteOptions)
        await req.user.addOption(option)
      }
      //还要给所有在这个房间的链接广播最新状态
      io.to('vote' + option.VoteId).emit(
        'voting info',
        //每个选项及其投票的人
        await Option.findAll({
          where: { VoteId: option.VoteId },
          include: [{
            model: User,
            attributes: ['name', 'gender', 'avatar', 'id'],
          }]
        })
      )
    }
    res.end()
  } else {
    res.status(404).end({
      code: -1,
      msg: '选项不存在'
    })

  }
})

//取消已投票
//post /vote/cancel/5
voteRouter.post('/cancel/:optionId', async (req, res, next) => {
  var option = await Option.findByPk(req.params.optionId, { include: Vote })
  if (option) {
    if (option.Vote.deadline.getTime() > Date.now()) {
      await option.removeUser(req.user)
      //还要给所有在这个房间的链接广播最新状态
      io.to('vote' + option.VoteId).emit(
        'voting info',
        //每个选项及其投票的人
        await Option.findAll({
          where: { VoteId: option.VoteId },
          include: [{
            model: User,
            attributes: ['name', 'gender', 'avatar', 'id'],
          }]
        })
      )
    }
    res.end()
  } else {
    res.status(404).end({
      code: -1,
      msg: '选项不存在'
    })
  }
})

//GET /vote/myvotes?startIndex=5&stopIndex=20
voteRouter.get('/myvotes', async (req, res, next) => {

  var result = await Vote.findAndCountAll({
    limit: req.query.stopIndex - req.query.startIndex,//选出数量
    offset: req.query.startIndex,//从第几个开始
    where: {
      UserId: req.user.id
    }
  })
  res.json(result)//count rows
})

