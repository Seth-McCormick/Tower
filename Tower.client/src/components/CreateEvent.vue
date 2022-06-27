<template>
    <form action="">
        <input class="form-control mt-2" placeholder="Name..." type="text" v-model="eventData.name">
        <input class="form-control mt-2" placeholder="Location..." type="text" v-model="eventData.location">
        <input class="form-control mt-2" placeholder="Image..." type="text" v-model="eventData.coverImg">
        <input class="form-control mt-2" placeholder="Date" type="date" v-model="eventData.startDate">
        <input class="form-control mt-2" placeholder="Capacity..." type="text" v-model="eventData.capacity">
        <textarea class="form-control mt-2" placeholder="Add a Description..." cols="30" rows="5"
            v-model="eventData.description"></textarea>
        <button class="btn btn-success d-flex mt-3" @click="createEvent">Create</button>
    </form>
</template>


<script>
import { ref } from 'vue'
import { AppState } from '../AppState'

import { router } from '../router'
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
    setup() {
        const eventData = ref({})
        return {
            router,
            eventData,
            async createEvent() {
                try {
                    // return the res.data out of this method so that we have an id to use for our router push, alias it out so we can use it
                    newEvent = AppState.events
                    const event = await eventsService.createEvent(eventData.value)
                    router.push(`/events/${event.id}`)
                    // router.push them to the page that they need to go to
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>



