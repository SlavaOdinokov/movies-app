<template>
  <div class="movie-info-wrap">
    <header class="movie-info__header">
      <h6 class="movie-info__header-title">Movie view</h6>
      <BIconX class="movie-info__close" @click="closeModal" />
    </header>

    <div class="movie-info__content">
      <BRow>
        <BCol sm="4">
          <div class="movie-info__poster-wrap">
            <div class="movie-info__poster" :style="posterStyle"></div>
          </div>
        </BCol>
        <BCol sm="8">
          <h3 class="movie-info__title">{{ movie.Title }}</h3>
          <BFormRating 
            class="movie-info__rating"
            v-model="movie.imdbRating"
            readonly
            show-value
            precision="1"
            stars="10"
            show-value-max
            no-border
          />
          <p class="movie-info__desc">{{ movie.Plot }}</p>
          <div class="mt-3 mb-4">
            <BBadge variant="success" class="mr-2">{{ movie.Year }}</BBadge>
            <BBadge variant="success" class="mr-2">{{ movie.Runtime }}</BBadge>
            <BBadge variant="success" class="mr-2">{{ movie.Genre }}</BBadge>
            <BBadge variant="success" class="mr-2">{{ movie.Language }}</BBadge>
          </div>
          <table class="table small">
            <tbody>
              <tr>
                <th>Production</th>
                <td>{{ movie.Production }}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{{ movie.Country }}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>{{ movie.Director }}</td>
              </tr>
              <tr>
                <th>Writer</th>
                <td>{{ movie.Writer }}</td>
              </tr>
              <tr>
                <th>Actors</th>
                <td>{{ movie.Actors }}</td>
              </tr>
              <tr>
                <th>Awards</th>
                <td>{{ movie.Awards }}</td>
              </tr>
            </tbody>
          </table>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInfoContent",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    defaultPosterBg: "linear-gradient(45deg,rgb(0, 3, 38) 0%,rgb(82, 15, 117) 100%)"
  }),
  computed: {
    posterStyle() {
      return {
        'background-image': this.posterBg
      }
    },
    posterBg() {
      return this.movie ? `url(${this.movie.Poster})` : this.defaultPosterBg
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.movie-info__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgb(0,3,38) 0%, rgb(82,15,117) 100%);
  color: #fff;
}
.movie-info__header-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
}
.movie-info__close {
  cursor: pointer;
  font-size: 26px;
}
.movie-info__content {
  padding: 1rem;
  background-color: #fff;
}
.movie-info__poster-wrap {
  position: relative;
  padding-bottom: 150%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 3px 12px 0 rgba(0,0,0,.7);
  transition: all .2s ease;
}
.movie-info__poster {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.movie-info__title {
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.1;
}
.movie-info__rating {
  padding: 0;
}
.movie-info__rating:focus {
  box-shadow: none;
}
.movie-info__rating >>> .b-rating-star, 
.movie-info__rating >>> .b-rating-value {
  justify-content: flex-start;
  flex-grow: 0 !important;
  font-size: 1.3rem;
  font-weight: 300;
  padding: 0;
}
.movie-info__rating >>> .b-rating-star .b-rating-icon {
  color: #ffc107;
}
.movie-info__rating >>> .b-rating-star + .b-rating-star {
  margin-left: 4px;
}
.movie-info__rating >>> .b-rating-value {
  margin-left: 10px;
}
.movie-info__desc {
  font-size: 1.25rem;
}
</style>
