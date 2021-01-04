import axios from '@/plugins/axios'
import ids from '@/store/mock/imdb_top250'
import mutations from '@/store/mutations'

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

const { MOVIES } = mutations

const moviesStore = {
  namespaced: true,
  state: {
    top250ids: ids,
    moviesPerPage: 12,
    moviesCurPage: 1,
    movies: {}
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIds: ({ top250ids }) => (from, to) => top250ids.slice(from, to),
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesCurPage: ({ moviesCurPage }) => moviesCurPage
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value
    }
  },
  actions: {
    initMovieStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies')
      },
      root: true
    },
    async fetchMovies({ commit, getters }) {
      try {
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
      }
    }
  }
}

export default moviesStore
