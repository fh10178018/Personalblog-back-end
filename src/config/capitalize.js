// 首字母大写,遇到‘-’,字符串驼峰化处理
export const capitalize = function (str) {
  if (typeof str !== 'string') return str
  str = str.split(/[-]/g)
  let newStr = ''
  for (const line of str) {
    newStr += line.charAt(0).toUpperCase() + line.slice(1)
  }
  return newStr
}
