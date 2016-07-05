import { Router } from 'express'

import User from './model'
import Ctrl from './ctrl'

const userCtrl = new Ctrl(User)
const router = Router()

router.route('/register')
  .post(userCtrl.register)

router.route('/login')
  .post(userCtrl.login)

export default router
