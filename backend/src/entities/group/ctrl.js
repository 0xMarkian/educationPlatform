import autobind from 'autobind-decorator'

import User from '../user/model'
import BasicCtrl from '../../lib/ctrl'

class GroupCtrl extends BasicCtrl {
  @autobind
  create(req, res, next){
    const { name } = req.body

    const { _id: userId } = req.user

    User.findById(userId, (err, user) => {
      if(user.group) return next(new Error('This user already have a group'))

      this.Model.create({
        name,
      }, (err, newGroup ) => {
        if(err) return next(err)

        User
          .update({_id: userId}, { group: newGroup._id} )
          .exec( err => { if(err) return next(err)} )

        res.status(201).json(newGroup)
      })
    })
  }

  @autobind
  list(req,res, next){
    const { group }  = req.user._doc

    this.Model
      .find({group})
      .exec( (err, entity) => {
        if(err) return next(err)

        res.json(entity)
      })
  }
}

export default GroupCtrl