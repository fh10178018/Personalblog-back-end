import { ref, computed, unref, reactive, watch } from 'vue'
import randomID from '../../../utils/randomID.js'

export const useCheckBox = (modelValue, value, curInstance) => {
  const isChecked = ref(modelValue.value)
  const labelID = ref(randomID())
  const parent = computed(() => curInstance.parent)
  const isGroup = computed(() => unref(parent).type.name === 'CheckBoxGroup')
  const setValue = computed(() => { // 当没有传vlaue值时，传值以isChecked的Boolean为主
    return unref(value) === undefined ? unref(isChecked) : unref(value)
  })
  watch(
    () => unref(modelValue),
    () => {
      isChecked.value = unref(modelValue)
    }
  )
  return [isChecked, labelID, parent, isGroup, setValue]
}

export const useCheckBoxGroupEvents = (emit, modelValue) => {
  const checkBoxGroup = reactive(unref(modelValue))

  const handlePushItem = val => {
    checkBoxGroup.push(val)
    emit('update:modelValue', checkBoxGroup)
  }
  const handleRemoveItem = val => {
    checkBoxGroup.splice(checkBoxGroup.indexOf(val), 1)
    emit('update:modelValue', checkBoxGroup)
  }

  return [checkBoxGroup, handlePushItem, handleRemoveItem]
}
