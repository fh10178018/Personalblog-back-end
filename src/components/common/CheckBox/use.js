import { ref, computed, unref, reactive, watchEffect, nextTick } from 'vue'
import randomID from '../../../utils/randomID.js'
export const useCheckBox = (modelValue, curInstance, CheckboxGroup, emit, dispatch, label) => {
  const checkbox = ref(null)
  const state = reactive({
    modelValue: null
    // If the parent element is ChceckboxGroup use its modelValue
  })
  watchEffect(() => {
    state.modelValue = CheckboxGroup.props.modelValue || modelValue.value
  })
  const model = computed({
    get () {
      return state.modelValue
      // BUG: if the Checkbox list and modelValue are an object, this causes the object element to be deleted.
      // Resolve: `isArray(modelValue) ? [...modelValue] : modelValue`, but doing so will invalidate the `checked` prop.
    },
    set ({ label, checked }) {
      if (label && unref(isGroup)) {
        // when modelValue or elCheckboxGroup.modeValue is array
        const modelValue = model.value
        const labelIndex = modelValue.indexOf(label)
        labelIndex === -1 && checked === true && modelValue.push(label)
        labelIndex !== -1 &&
          checked === false &&
          modelValue.splice(labelIndex, 1)
        state.modelValue = modelValue
        emit('update:modelValue', modelValue)
      } else {
        const modelValue = checked
        state.modelValue = modelValue
        emit('update:modelValue', modelValue)
        dispatch('FormItem', 'form-change', unref(modelValue))
      }
    }
  })
  async function handleChange () {
    await nextTick()
    if (unref(label)) {
      emit('change', { label: unref(label), value: model.value })
    } else {
      emit('change', model.value)
    }
  }
  const isChecked = computed(() => {
    const _isChecked = unref(isGroup)
      ? unref(state.modelValue).indexOf(unref(label)) !== -1
      : unref(state.modelValue)

    checkbox.value && (checkbox.value.checked = _isChecked)
    return _isChecked
  })
  const labelID = ref(randomID())
  const parent = computed(() => curInstance.parent)
  const isGroup = computed(() => unref(parent).type.name === 'CheckBoxGroup')

  return [labelID, model, checkbox, isChecked, handleChange]
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
