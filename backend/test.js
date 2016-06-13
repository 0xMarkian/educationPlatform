function symbExchange(line) {
  const len = line.length-1
  const res = line[len]+line.substr(1, len-1)+line[0]
  return res
}
console.log( symbExchange('az') )