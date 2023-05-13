const db = require('../../config/mongoose')
const User = require('../user_account')
const userList = require('../user.json')

db.once('open', () => {
  userList.forEach(user => {
    User.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  })
  console.log('done')
})