import BasicCtrl from '../../lib/ctrl'

class StudentCtrl extends BasicCtrl{
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