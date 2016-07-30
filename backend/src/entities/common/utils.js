export const filterValidationErrObj = obj => {
  const newObj = {}
  Object.keys(obj).forEach( objKey => {
    newObj[objKey] = obj[objKey].message
  })
  return newObj
}