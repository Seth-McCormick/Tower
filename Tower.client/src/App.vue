<template>




  <div class="col-12 d-flex bg-dark">
    <div class="col-12 mt-2 ps-2">
      <div class=" text-success lighten-30  text-uppercase">
        <h1>Tower</h1>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end ">
    <div class="col-md-10 m-0">
      <router-view />
    </div>
    <div class="col-2 d-flex bg-dark">
      <div class="col-12 text-center">
        <Login class="login-data" />

      </div>
    </div>
  </div>






</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
