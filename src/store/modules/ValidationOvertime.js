const state = {
  TimePenalty: localStorage.getItem('TimePenalty') ? localStorage.getItem('TimePenalty') : 0,
  verifyCount: 0,
  isPenalty: !!localStorage.getItem('TimePenalty'),
  countDownTime: 60 * 5
}

const addZero = str => { // 当时间为单位数时，前面加上数字0
  return str.length === 1 ? '0' + str : str
}

const actions = {
  errorVerification (context) { // 用于记录验证错误次数
    if (context.state.verifyCount < 5) { // 最多五次
      context.commit('INCREASED')
    } else {
      context.commit('PENALTY')
      context.dispatch('countDown')
    }
  },
  countDown (context) {
    context.commit('REMAININGTIME')
    const timer = setInterval(() => {
      context.state.countDownTime--
      if (context.state.countDownTime < 1) {
        context.commit('RESET')
        clearTimeout(timer)
      }
    }, 1000)
  }
}

const mutations = {
  PENALTY (state) { // 记录验证时间惩罚戳
    state.isPenalty = true
    state.TimePenalty = Date.parse(new Date()) + 5 * 60 * 1000 // 记录5min之后的时间戳
    localStorage.setItem('TimePenalty', state.TimePenalty)
  },
  REMAININGTIME (state) {
    state.countDownTime = Math.floor((localStorage.getItem('TimePenalty') - Date.parse(new Date())) / 1000)
  },
  INCREASED (state) { // 验证次数增长
    state.verifyCount++
  },
  RESET (state) { // 重置验证次数
    state.verifyCount = 0
    state.isPenalty = false
    state.countDownTime = 60 * 5
    localStorage.removeItem('TimePenalty')
  }
}

const getters = {
  showTimeDifference (state) {
    if (state.isPenalty) {
      const timeDifference = state.countDownTime * 1000
      const reduce1 = timeDifference % (60 * 1000) // 计算分钟后剩余毫秒数
      const minutes = Math.floor(timeDifference / (60 * 1000)).toString()
      const seconds = Math.round(reduce1 / 1000).toString()
      return addZero(minutes) + ':' + addZero(seconds)
    }
    return null
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
