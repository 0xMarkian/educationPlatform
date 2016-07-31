import BasicCtrl from '../common/ctrl'
import autobind from 'autobind-decorator'

import { filterValidationErrObj } from '../common/utils'

class SubjectCtrl extends BasicCtrl {
  @autobind
  create(req,res, next){
    const { name } = req.body

    this.Model.create({
      name,
    }, (err, data ) => {
      if(err) return res.status(400).json({ errors: filterValidationErrObj(err.errors)})

      res.json({ data })
    })

  }
}

export default SubjectCtrl