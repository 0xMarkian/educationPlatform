const basicSchemaCtrls = {
  create(params){
    return cb => {
      const newEntity = new this({
        ...params,
      })
      newEntity.save( (err, entity) => {
        cb(entity)
      })
    }
  },
  list(cb){
    return cb => this.find( (err, entities) => cb(entities) )
  }
}
export default basicSchemaCtrls