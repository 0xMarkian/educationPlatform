import { Router } from 'express'

import Student from './model'
import Ctrl from './ctrl'

const studentCtrl = new Ctrl(Student)
const router = Router()

router.route('/')
  .post(studentCtrl.create)
  .get(studentCtrl.list)

export default router