/**
 * 用于合并对象， 将重复的值合并掉
 * arguments和function 不可分割，用来枚举对象参数的每一个元素
 * */
export default function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}
