import Student2Course from '../student2Course/model'
import Student from '../student/model'

import BasicCtrl from '../../lib/ctrl'


class CourseCtrl extends BasicCtrl{
  create(req, res, next){
    const { subject, group } = req.body

    this.Model.create({
      subject,
    }, (err, newCourse) => {
      if(err) return next(err)

      Student
        .find({group})
        .select('_id')
        .exec( (err, findedStudents) => {
          if(err) return next(err)

          findedStudents.forEach( student => {
            Student2Course.create({
              student: student._id,
              course: newCourse._id,
            }, err => {
              if(err) return next(err)
              res.status(201).json(newCourse)
            })
          })
        })
    })
  }
}


export default CourseCtrl