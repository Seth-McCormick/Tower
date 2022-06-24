<template>


  <div class="d-flex bg-dark">

    <div class="col-10">
      <div class="col-12 m-3">


        <div class=" text-success lighten-30  text-uppercase">
          <h1>Tower</h1>
        </div>



      </div>

    </div>

    <div class="col-2  mt-3">
      <div class="col-12 text-center">
        <Login />
        <!-- <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable mt-3">
          Home
        </router-link> -->
      </div>
    </div>
  </div>
  <router-view />





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
