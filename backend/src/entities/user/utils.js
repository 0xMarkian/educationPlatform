import User from './model'


export const findCurrUserGroup = userId => new Promise( (resolve, reject) => {
  User
    .findById(userId)
    .exec( (err,user) => {
      if (err) return reject(err)

      if(!user) return reject({ message: 'The user with this id doesn\'t exist', status: 401,})
      if(!user.group) return reject({ message: 'This user does not hav§e a group. Please create one', status: 404, })

      resolve(user.group)
    })
})
export const catchFindCurrUserGroup = res => err => {
  const { status, message } = err
  if(status === 401) res.clearCookie('accessToken', { httpOnly: true })

  res.status(status).json({ message })
}