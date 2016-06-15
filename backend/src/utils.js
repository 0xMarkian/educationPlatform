export const handleError = res => err => {
  if(err) res.send(err)
}