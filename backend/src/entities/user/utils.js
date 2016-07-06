import User from './model'


export const findCurrUserGroup = userId => new Promise( (resolve, reject) => {
  User
    .findById(userId)
    .exec( (err,user) => {
      if (err) return console.error(err)
      
      resolve(user.group)
    })
})