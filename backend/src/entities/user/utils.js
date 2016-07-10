import User from './model'


export const findCurrUserGroup = userId => new Promise( (resolve, reject) => {
  User
    .findById(userId)
    .exec( (err,user) => {
      if (err) return console.error(err)
      if(!user) return console.error('The user doesn\'t exist')
      if(!user.group) return console.error('This user doesn not have a group')

      resolve(user.group)
    })
})
1