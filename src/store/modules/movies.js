import axios from '@/plugins/axios'
import ids from '@/store/mock/imdb_top250'
import mutations from '@/store/mutations'

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations

const moviesStore = {
  namespaced: true,
  state: {
    top250ids: ids,
    moviesPerPage: 12,
    moviesCurPage: 1,
    movies: {},
    isSearch: false
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIds: ({ top250ids }) => (from, to) => top250ids.slice(from, to),
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesCurPage: ({ moviesCurPage }) => moviesCurPage,
    moviesLength: ({ top250ids }) => Object.keys(top250ids).length,
    isSearch: ({ isSearch }) => isSearch

  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value
    },
    [CURRENT_PAGE](state, page) {
      state.moviesCurPage = page
    },
    [REMOVE_MOVIE](state, index) {
      state.top250ids.splice(index, 1)
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool
    }
  },
  actions: {
    async fetchMovies({ commit, getters, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true })
        const { moviesCurPage, moviesPerPage, slicedIds } = getters
        const from = (moviesCurPage * moviesPerPage) - moviesPerPage
        const to = moviesCurPage * moviesPerPage
        const moviesToFetch = slicedIds(from, to)

        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`))
        const response = await Promise.all(requests)

        const movies = serializeResponse(response)
        commit(MOVIES, movies)
      } catch (err) {
        console.log(err)
      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page)
      dispatch('fetchMovies')
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250ids.findIndex(item => item === id)

      if (index !== -1) {
        commit(REMOVE_MOVIE, index)
        dispatch('fetchMovies')
      }
    },
    async searchMovie({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true })
        const response = await axios.get(`/?s=${query}`)

        if (response.Error) {
          throw Error(response.Error)
        }

        const movies = serializeResponse(response.Search)
        commit(MOVIES, movies)
      } catch (err) {
        dispatch('showNotify', { 
          msg: err.message, 
          title: 'Error', 
          variant: 'danger' 
        }, { root: true })
      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool)
    }
  }
}

export default moviesStore
