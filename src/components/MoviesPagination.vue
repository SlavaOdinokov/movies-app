<template>
  <div class="movies-pagination">
    <BPagination
      v-model="currentPageModal"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
    />
    {{ currentPage }}
  </div>
</template>

<script>
export default {
  name: "MoviesPagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentPageModal: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('pageChanged', value)
      }
    }
  }
}
</script>

<style scoped>
.movies-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 50px;
}
.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}
.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: #808080;
  border-color: #808080;
}
</style>
