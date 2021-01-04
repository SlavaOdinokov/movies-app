<template>
  <div id="app">
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <PosterBg :poster="posterBg" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'
import PosterBg from '@/components/PosterBg'

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBg
  },
  data: () => ({
    posterBg: ''
  }),
  computed: {
    ...mapGetters('movies', ['moviesList'])
  },
  methods: {
    ...mapActions('movies', ['fetchMovies']),
    onChangePoster(poster) {
      this.posterBg = poster
    }
  }
};
</script>

<style>
#app {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
