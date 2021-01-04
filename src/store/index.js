import Vue from "vue"
import Vuex from "vuex"
import movies from './modules/movies'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies
  }
})

store.dispatch('initMovieStore')

export default store
