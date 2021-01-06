<template>
  <div id="app">
    <Loader />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <PosterBg :poster="posterBg" />
    <MoviesPagination 
      :current-page="moviesCurPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'
import PosterBg from '@/components/PosterBg'
import MoviesPagination from '@/components/MoviesPagination'
import Loader from '@/components/Loader'

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader
  },
  data: () => ({
    posterBg: ''
  }),
  computed: {
    ...mapGetters('movies', ['moviesList', 'moviesCurPage', 'moviesPerPage', 'moviesLength'])
  },
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('movies', ['fetchMovies', 'changeCurrentPage']),
    onChangePoster(poster) {
      this.posterBg = poster
    },
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page))
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } })
    }
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
