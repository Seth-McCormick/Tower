<template>
  <div class="container-fluid bg-dark">
    <div class="row justify-content-center">
      <div class="col-md-12 mt-3 elevated-3 bg-dark rounded border image-bg"
        :style="{ 'background-image': 'url(https://images.unsplash.com/photo-1516100413948-27235ca6990e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)' }">
        <div class="col-md-3 m-3">
          <h3 class="text-light p-4">Welcome to tower! Login to get started and make an event for people to
            enjoy!
          </h3>
        </div>
      </div>


      <div class="col-md-11 mt-3 p-3 d-flex justify-content-between bg-secondary text-light">
        <b class="selectable">Concert</b>
        <b class="selectable">Convention</b>
        <b class="selectable">Sport</b>
        <b class="selectable">Digital</b>
      </div>


      <div class="col-md-10 mt-3">
        <div class="col-md-12 ">
          <div class="row justify-content-between">

            <Event v-for="e in events" :key="e.id" :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'

export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {

        Pop.error(error)
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  text-shadow: 2px 2px #000000 !important;
}

.image-bg {
  background-repeat: no-repeat;
  object-fit: fill;
  background-position: center;

}
</style>
