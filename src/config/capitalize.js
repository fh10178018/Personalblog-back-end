// 首字母大写
export const capitalize = function (str) {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
