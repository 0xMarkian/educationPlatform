import autobind from 'autobind-decorator'

import Student2CourseCtrl from '../student2Course/ctrl'
import { findCurrUserGroup } from '../user/utils'

import { filterValidationErrObj } from '../common/utils'

class StudentCtrl extends Student2CourseCtrl {
  @autobind
  create(req,res,next){
    const { name } = req.body
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model.create({
        name,
        group,
      }, (err, data) => {
        console.log(err)
        if(err) return res.status(400).json({ errors: filterValidationErrObj(err.errors)})

        res.json({ data })
      })
    })
  }
}

export default StudentCtrl