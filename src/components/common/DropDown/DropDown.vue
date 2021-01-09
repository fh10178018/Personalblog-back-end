<template>
  <popper :placement="placement"
          :trigger="trigger"
          :offset="offset">
    <div class="dropdown-link">
      <slot></slot>
    </div>
    <template v-slot:popper-content>
      <slot name="dropdown"></slot>
    </template>
  </popper>
</template>

<script>
import { toRefs } from 'vue'
import Popper from '../Popper/Popper.vue'
export default {
  components: { Popper },
  name: 'DropDown',
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
    offset: { // [水平偏移量，垂直偏移量],推荐为0，在hover时，会优先消失
      type: Array,
      default: () => [0, 0]
    }
  },
  setup (props) {
    return {
      ...toRefs(props)
    }
  }
}
</script>

<style lang="less">
.drop-down-menu {
  border-radius: 4px;
  background-color: var(--main-color);
  color: var(--main-font-color);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  > ul {
    list-style: none;
    padding: 5px 10px;
    > li {
      cursor: pointer;
      padding: 0 10px;
      margin: 0 -10px;
      line-height: 34px;
      > span {
        margin-left: 10px;
      }
    }
    .active {
      font-weight: bold;
      background-color: var(--lighter-color) !important;
    }
    > li:hover {
      background-color: var(--main-background-color);
    }
    > .drop-down-item-div {
      line-height: 34px;
      padding: 0 10px;
      margin: 0 -10px;
      border-bottom: 1px solid var(--main-background-color);
    }
  }
  ul.right {
    text-align: right;
  }
  ul.left {
    text-align: left;
  }
  ul.center {
    text-align: center;
  }
}
</style>
