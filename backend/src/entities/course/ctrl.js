import autobind from 'autobind-decorator'

import Student2Course from '../student2Course/model'
import Student from '../student/model'
import { findCurrUserGroup, catchFindCurrUserGroup } from '../user/utils'

import Studets2CourseCtrl from '../student2Course/ctrl'

import { filterValidationErrObj } from '../common/utils'


class CourseCtrl extends Studets2CourseCtrl {
  @autobind
  create(req, res, next){
    const { subject } = req.body
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model.create({
        subject,
        group,
      }, (err, newCourse) => {
        if (err) return res.status(400).json({ errors: filterValidationErrObj(err.errors)})

        Student
          .find({group})
          .select('_id')
          .exec((err, findedStudents) => {
            if (err) return next(err)

            if(findedStudents.length === 0) return res.status(400).json({ message: 'No students found. The group must have students.'})

            const student2CourseDocs = findedStudents.map( student => ({
              group,
              student: student._id,
              course: newCourse._id
            }))

            Student2Course.create(student2CourseDocs, (err, entities) => {
              if(err) res.status(400).json({ errors: filterValidationErrObj(err.errors)})

              res.json({ data: newCourse})
            })
          })
      })
    }).catch( catchFindCurrUserGroup(res) )
  }
}


export default CourseCtrl