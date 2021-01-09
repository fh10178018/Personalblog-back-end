<!--Popper组件
本插件基于@popperjs/core，注意使用时，提高mouseenter的有效范围
-->
<template>
  <div class="popper-wrap">
    <div ref="popcorn"
         @click.self="toggleDropDown"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave"
         class="popcorn">
      <slot></slot>
    </div>
    <transition name="popper"
                appear>
      <div v-show="visible"
           @mouseenter="handleMouseEnter"
           @mouseleave="handleMouseLeave">
        <div class="popper-content"
             ref="tooltip">
          <div class="arrow"></div>
          <slot name="popper-content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { computed, ref, toRefs, unref, watch } from 'vue'
export const usePopper = (placement, trigger, offset) => {
  const visible = ref(false)
  const hovering = ref(false)
  const popcorn = ref(null)
  const tooltip = ref(null)
  const getPopcorn = () => {
    return unref(popcorn)
  }
  const getTooltip = () => {
    return unref(tooltip)
  }
  const isClickTrigger = computed(() => unref(trigger) === 'click')
  const create = () => {
    const popcorn = getPopcorn()
    const tooltip = getTooltip()
    createPopper(popcorn, tooltip, {
      strategy: 'fixed',
      placement: unref(placement),
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: unref(offset)
          }
        }
      ]
    })
  }
  return [
    create,
    visible,
    hovering,
    popcorn,
    tooltip,
    isClickTrigger
  ]
}
export const useInteractive = (visible, hovering, isClickTrigger, create) => {
  const toggleDropDown = () => {
    if (unref(isClickTrigger)) { visible.value = !unref(visible) }
  }
  const handleShow = () => {
    visible.value = true
    create()
  }
  const handleFade = () => {
    visible.value = false
  }
  const handleMouseEnter = () => {
    hovering.value = true
  }

  const handleMouseLeave = () => {
    hovering.value = false
  }
  return [
    handleShow,
    handleFade,
    toggleDropDown,
    handleMouseEnter,
    handleMouseLeave
  ]
}
export default {
  name: 'Popper',
  props: {
    placement: {
      type: String,
      default: 'bottom',
      validator (val) {
        return ['right', 'left', 'bottom', 'top', 'right-end', 'right-start', 'left-end', 'left-start', 'top-start', 'top-end', 'bottom-start', 'bottom-end'].indexOf(val) > -1
      }
    },
    trigger: {
      type: String,
      default: 'hover',
      validator (val) {
        return ['hover', 'click'].indexOf(val) > -1
      }
    },
    offset: { // [水平偏移量，垂直偏移量]
      type: Array,
      default: () => [0, 0]
    }
  },
  setup (props) {
    const { placement, trigger, offset } = toRefs(props)
    const [create, visible, hovering, popcorn, tooltip, isClickTrigger] = usePopper(placement, trigger, offset)
    const [
      handleShow,
      handleFade,
      toggleDropDown,
      handleMouseEnter,
      handleMouseLeave
    ] = useInteractive(visible, hovering, isClickTrigger, create)
    watch(() => unref(hovering),
      () => {
        if (!unref(isClickTrigger)) {
          if (unref(hovering)) handleShow()
          else handleFade()
        }
      }
    )

    return {
      visible,
      handleShow,
      handleFade,
      toggleDropDown,
      handleMouseEnter,
      handleMouseLeave,
      popcorn,
      tooltip
    }
  }
}
</script>

<style lang="less">
.popper-wrap {
  .popper-content {
    width: auto;
    z-index: 5;
  }
  .arrow {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid var(--main-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
.popper-slide-enter-active,
.popper-slide-leave-active {
  height: 0;
}
.popper-slide-enter,
.popper-slide-leave-to {
  height: 0;
}
</style>
