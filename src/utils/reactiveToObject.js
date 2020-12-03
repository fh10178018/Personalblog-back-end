import {
  toRefs
} from 'vue'

export default function reactiveToObject (reactive) {
  const refs = toRefs(reactive)
  const res = {}
  for (const key in refs) {
    res[key] = refs[key].value
  }
  return res
}
