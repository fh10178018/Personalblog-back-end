<template>
  <div class="progress-wrap">
    <div class="progress-circle" v-if="nativeType === 'circle'">
      <svg
        class="circle-wrap"
        xmlns="http://www.w3.org/2000/svg"
        :viewPort="[0, 0, radius + 5, radius + 5]"
        :style="{
          width: 2 * (5 + radius) + 'px',
          height: 2 * (5 + radius) + 'px'
        }"
        version="1.1"
      >
        <circle
          class="path"
          :r="radius"
          :cx="radius + 5"
          :cy="radius + 5"
          fill="transparent"
          :stroke-dasharray="sumCirclePath"
          :stroke-width="nativeStrokeWidth"
          stroke-dashoffset="0"
        ></circle>
        <circle
          class="track"
          :r="radius"
          :cx="radius + 5"
          :cy="radius + 5"
          fill="transparent"
          :stroke-width="nativeStrokeWidth"
          :stroke-dasharray="sumCirclePath"
          stroke-dashoffset="0"
          stroke-linecap="round"
          :style="circleTrackStyle"
        ></circle>
      </svg>
      <h5>{{ nativePercentage }}</h5>
    </div>
  </div>
</template>
<script>
import { computed, toRefs, unref } from 'vue'
import { useProgressCicrle, useProgress } from './use'
export default {
  name: 'Progress',
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator (val) {
        return val >= 0 && val <= 100
      }
    },
    type: {
      type: String,
      default: 'circle',
      validator (val) {
        return ['circle', 'bar'].indexOf(val) > -1
      }
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    radius: { // 半径大小，只有在type为circle时生效
      type: Number,
      default: 50
    },
    color: [String, Array]
  },
  setup (props) {
    const { type, percentage, strokeWidth, radius, color } = toRefs(props)
    const [showColorStyle] = useProgress(color)
    const nativeType = computed(() => unref(type))
    const nativeStrokeWidth = computed(() => unref(strokeWidth))
    const nativePercentage = computed(() => unref(percentage) + '%')
    const [sumCirclePath, circleTrackStyle] = useProgressCicrle(radius, percentage, showColorStyle)

    return {
      ...toRefs(props),
      nativeType,
      circleTrackStyle,
      sumCirclePath,
      nativeStrokeWidth,
      nativePercentage
    }
  }
}
</script>
<style lang="less">
.progress-wrap {
  .progress-circle {
    display: inline-block;
    position: relative;
    .circle-wrap {
      transform: rotate(-90deg);
      circle {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 1s linear;
        stroke: var(--main-background-color);
      }
      .track {
        stroke: var(--theme-color);
      }
    }
    h5 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--main-font-color);
    }
  }
}
</style>
