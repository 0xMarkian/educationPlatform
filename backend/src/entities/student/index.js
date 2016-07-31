import { Router } from 'express'

import Student from './model'
import Ctrl from './ctrl'

const studentCtrl = new Ctrl(Student)
const router = Router()

router.route('/')
  .post(studentCtrl.create)
  .get(studentCtrl.list)

router.route('/:id')
  .delete(studentCtrl.removeById)
  .patch(studentCtrl.update)

export default router