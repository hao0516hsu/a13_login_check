const mongoose = require('mongoose')
const User = require('../user_account')
const userList = require('../user.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  userList.forEach(user => {
    User.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  })
  
  console.log('done')
})