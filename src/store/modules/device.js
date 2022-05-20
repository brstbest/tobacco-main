const getDefaultState = () => {
  return {
    device: {},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  // device setDevice
  setDevice({ commit }, device) {
    console.log('store', device)
    commit('SET_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
