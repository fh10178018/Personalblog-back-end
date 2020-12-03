export function getPWDLevel (pwd) {
  // 判断输入密码的类型
  let res = ''
  var m = 0
  var Modes = 0
  for (let i = 0; i < pwd.length; i++) {
    var charType = 0
    var t = pwd.charCodeAt(i)
    if (t >= 48 && t <= 57) charType = 1 // 为0～9十个阿拉伯数字
    else if (t >= 65 && t <= 90) charType = 2 // 为26个大写英文字母
    else if (t >= 97 && t <= 122) charType = 4 // 为26个小写英文字母
    else charType = 4
    Modes |= charType
  }
  // 计算密码模式
  for (let i = 0; i < 4; i++) {
    if (Modes & 1) { m++ }
    Modes >>>= 1
  }
  if (pwd.length <= 4) { m = 1 }
  if (pwd.length <= 0) { m = 0 }
  // 返回强度级别
  switch (m) {
    case 1:
      res = 'weak'
      break
    case 2:
      res = 'medium'
      break
    case 3:
      res = 'strong'
      break
    default:
      res = 'none'
      break
  }
  return res
}
