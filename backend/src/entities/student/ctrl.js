import autobind from 'autobind-decorator'

import Student2CourseCtrl from '../student2Course/ctrl'
import { findCurrUserGroup } from '../user/utils'

class StudentCtrl extends Student2CourseCtrl {
  @autobind
  create(req,res,next){
    const { name } = req.body
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model.create({
        name,
        group,
      }, (err, newEntity) => {
        if(err) return next(err)

        res.json(newEntity)
      })
    })
  }
}

export default StudentCtrl