import mongoose from 'mongoose'

import { requiredObjectId } from '../../lib/model'


const groupSchema = new mongoose.Schema({
  name: String,
})


export default mongoose.model('Group', groupSchema)