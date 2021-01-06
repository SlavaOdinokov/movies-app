<template>
  <header class="header">
    <BNavbar class="navbar" type="dark" variant="dark">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput 
            class="mr-sm-2 search-input" 
            placeholder="Search"
            v-model="searchValue"
            debounce="500"
          />
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Header",
  data: () => ({
    searchValue: ''
  }),
  watch: {
    searchValue: 'onSearchValueChanged'
  },
  methods: {
    ...mapActions('movies', ['searchMovie', 'fetchMovies', 'toggleSearchState']),
    onSearchValueChanged(value) {
      if (value) {
        this.searchMovie(value)
        this.toggleSearchState(true)
      } else {
        this.fetchMovies()
        this.toggleSearchState(false)
      }
    }
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(0, 0, 0, .7) !important;
}
.search-input {
  color: #fff;
  background: rgba(255, 255, 255, .1);
  border-color: rgba(0, 0, 0, .6);
}
.search-input:focus {
  color: #fff;
  box-shadow: none;
  background: rgba(255, 255, 255, .2);
  border-color: rgba(0, 0, 0, .6);
}
</style>