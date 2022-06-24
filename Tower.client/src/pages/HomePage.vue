<template>
  <div class="container-fluid">

    <div class="col-md-12 elevated-3 bg-dark ">
      <div class="col-md-3 m-3">
        <h3 class="text-light p-4">Welcome to tower! Easily get started and make an event for people to enjoy!
        </h3>
        {{ events }}
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
</style>
