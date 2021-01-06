import mutations from '@/store/mutations'

const { SHOW_NOTIFY } = mutations

const notificationsStore = {
  state: {
    messagePool: []
  },
  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1]
  },
  mutations: {
    [SHOW_NOTIFY](state, message) {
      state.messagePool.push(message)
    }
  },
  actions: {
    showNotify({ commit }, message) {
      commit(SHOW_NOTIFY, message)
    }
  }
}

export default notificationsStore
