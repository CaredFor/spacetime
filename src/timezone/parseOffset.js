const isOffset = /(\-?[0-9]+)h(rs)?/i
const isNumber = /(\-?[0-9]+)/
const utcOffset = /utc([\-+]?[0-9]+)/i
const gmtOffset = /gmt([\-+]?[0-9]+)/i

const toIana = function(num) {
  num = Number(num)
  if (num > -13 && num <= 13) {
    num = num * -1 //it's opposite!
    num = (num > 0 ? '+' : '') + num //add plus sign
    return 'etc/gmt' + num
  }
  return null
}

const parseOffset = function(tz) {
  // '+5hrs'
  console.log('10:'+tz);
  let m = tz.match(isOffset)
  console.log('11:'+m[0]);
  console.log('12:'+m[1]);
  console.log('13:'+m[2]);

  if (m !== null) {
    return toIana(m[1])
  }
  // 'utc+5'
  m = tz.match(utcOffset)
  if (m !== null) {
    return toIana(m[1])
  }
  // 'GMT-5' (not opposite)
  m = tz.match(gmtOffset)
  if (m !== null) {
    let num = Number(m[1]) * -1
    return toIana(num)
  }
  // '+5'
  m = tz.match(isNumber)
  if (m !== null) {
    return toIana(m[1])
  }
  return null
}
module.exports = parseOffset
