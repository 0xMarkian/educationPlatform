import autobind from 'autobind-decorator'

import Student2CourseCtrl from '../student2Course/ctrl'


class StudentCtrl extends Student2CourseCtrl {
  @autobind
  create(req,res,next){
    const { name, group } = req.body

    this.Model.create({
      name,
      group,
    }, (err, newEntity) => {
      if(err) return next(err)

      res.json(newEntity)
    })
  }
}

export default StudentCtrl