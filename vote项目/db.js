const { Sequelize, DataTypes, Model, Op } = require('sequelize')
const path = require('path');
// var __dirname = __dirname ?? '.'
// var exports = exports ?? {} ;
const dbFile = path.join(__dirname, 'db.sqlite3')//数据库连接
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile,
  logging: false, //关闭sql log
});

exports.sequelize = sequelize

class User extends Model { }
exports.User = User
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,//用户名不重复
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,//邮箱不重复
  },
  gender: {
    type: DataTypes.ENUM('f', 'm'),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'User' //在数据库中的名字
})


class Vote extends Model { }
exports.Vote = Vote
Vote.init({
  title: DataTypes.STRING,
  desc: DataTypes.STRING,//描述
  deadline: DataTypes.DATE,//
  multiSelect: DataTypes.BOOLEAN,//单选or多选
  anonymous: DataTypes.BOOLEAN,//匿名投票
  restricted: DataTypes.BOOLEAN,//限制传播
}, {
  sequelize,
  modelName: 'Vote',
})

User.hasMany(Vote)
Vote.belongsTo(User)

class Option extends Model { }
exports.Option = Option
Option.init({
  content: DataTypes.STRING,
  count: DataTypes.INTEGER,

}, {
  sequelize,
  modelName: 'Option',
  timestamps: false, //关闭时间戳
})
Vote.hasMany(Option)
Option.belongsTo(Vote)

// User.hasMany(Option)
// Option.belongsToMany(User, {
//   through: 'UserVoting'
// })  此为不对的多对多写法

User.belongsToMany(Option, {
  through: 'UserVoting'
})
Option.belongsToMany(User, {
  through: 'UserVoting'
})
sequelize.sync()//写入{force:true}后，每次定义表之前后清空所有表！

