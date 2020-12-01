import { computed, unref } from 'vue'

export const useProgress = (color) => {
  const getCurrentColor = (percentage) => {
    if (typeof color.value === 'string') {
      return color.value
    } else {
      return getLevelColor(percentage)
    }
  }
  const getLevelColor = (percentage) => {
    const colorArray = getColorArray().sort(
      (a, b) => a.percentage - b.percentage
    )
    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percentage) {
        return colorArray[i].color
      }
    }
    return colorArray[colorArray.length - 1].color
  }
}

export const useProgressCicrle = (radius, percentage) => {
  const sumCirclePath = computed(() => Math.PI * (unref(radius) * 2))

  const circleTrackStyle = computed(() => {
    return { strokeDashoffset: ((100 - unref(percentage)) / 100) * unref(sumCirclePath) + 'px' }
  })
  return [sumCirclePath, circleTrackStyle]
}
