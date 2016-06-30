import { Router } from 'express'

import Student2Course from './model'
import Ctrl from './ctrl'

const student2CourseCtrl = new Ctrl(Student2Course)
const router = Router()

router.route('/')
  .get(student2CourseCtrl.list)


export default router