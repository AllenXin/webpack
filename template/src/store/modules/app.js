const app = {
  state: {
    fullscreenLoading: false // 全屏loading
  },
  mutations: {
    'TOGGLE_FULLSCREENLOADING': state => {
      state.fullscreenLoading = !state.fullscreenLoading
    },
    'CANCEL_FULLSCREENLOADING': state => {
      state.fullscreenLoading = false
    },
    'APPLY_FULLSCREENLOADING': state => {
      state.fullscreenLoading = true
    }
  },
  actions: {
    ToggleFullscreenLoading: ({commit}) => {
      commit('TOGGLE_FULLSCREENLOADING')
    },
    CancelFullscreenLoading: ({commit}) => {
      commit('CANCEL_FULLSCREENLOADING')
    },
    ApplyFullscreenLoading: ({commit}) => {
      commit('APPLY_FULLSCREENLOADING')
    }
  }
}

export default app
