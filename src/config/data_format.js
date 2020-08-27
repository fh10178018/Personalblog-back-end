// 自定义时间格式化函数
export default function Format (fmt, Date) {
  var o = {
    'M+': Date.getMonth() + 1,
    'd+': Date.getDate(),
    'h+': Date.getHours(),
    'm+': Date.getMinutes(),
    's+': Date.getSeconds(),
    'q+': Math.floor((Date.getMonth() + 3) / 3)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (Date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
