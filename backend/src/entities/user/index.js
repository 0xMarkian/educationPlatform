import { Router } from 'express'

import User from './model'
import Ctrl from './ctrl'

const userCtrl = new Ctrl(User)
const router = Router()

router.route('/signUp')
  .post(userCtrl.signUp)

router.route('/signIn')
  .post(userCtrl.signIn)

export default router
