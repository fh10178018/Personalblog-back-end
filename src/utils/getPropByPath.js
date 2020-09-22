// 根据字符串路径获取对象属性
// var obj = { aaa: { bbb: { ccc: 123 } } }
//
// var prop="aaa.bbb.ccc"
// console.log(getValueByPath(obj, prop))

export function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)]/g, '.$1') // 将[0]转换为.0
  path = path.replace(/^\./, '') // 去除开头的.

  const keyArr = path.split('.') // 根据.切割
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) { // 开启严格模式，没找到对应的Key值，抛出错误
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj, // 原始数据
    k: keyArr[i], // key值
    v: tempObj ? tempObj[keyArr[i]] : null // key值对应的值
  }
}
