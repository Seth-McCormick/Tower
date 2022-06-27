<template>
    <div class="container-fluid bg-dark">

        <div class="col-md-12 mt-3 d-flex bg-secondary rounded justify-content-around ">
            <div class="col-md-4">
                <img class="img-fluid p-3" :src="event.coverImg" alt="">
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-between mt-3">
                    <h2>{{ event.name }}</h2>
                    <b>{{ formatDate(event.startDate) }}</b>
                </div>
                <div class="d-flex justify-content-between mt-3 ">
                    <h4>{{ event.location }}</h4>

                </div>
                <p class=" mt-4">{{ event.description }}</p>
                <div class="d-flex justify-content-between mt-4">
                    <b>{{ event.capacity }} Spots Left!</b>
                    <!-- NOTE create ticket method is called here, you will need the eventId to create a ticket -->
                    <button class="btn btn-warning p-1 m-3" @click="createTicket">Attend</button>
                </div>
            </div>
        </div>


        <div class="row justify-content-center">
            <div class="col-md-11 mt-4">
                See who is Attending
                <div class="col-md-12">
                    <div class="col-md-12 bg-secondary">
                        <!-- NOTE get all of my tickets for my event, v-for over them here. remember to add a title attribute with their name -->
                        <img :src="attendee?.creator.picture" alt="">
                    </div>
                </div>
            </div>
        </div>


        <div class="row justify-content-center">

            <div class="col-md-10 my-5">
                What are people Saying
                <div class="col-md-12 bg-secondary p-3">
                    <form action="" @submit.prevent="createComment">
                        <textarea class="form-control" placeholder="Add a Comment..." v-model="commentData.body" name=""
                            id="" cols="30" rows="5"></textarea>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-success m-2">Post</button>
                        </div>
                    </form>

                    <Comment v-for="c in comment" :key="c.id" :comment="c" />
                    <!-- <div class="row mt-2">
                        <div class="col-md-2">

                            <img class="profile-img" src="https://thiscatdoesnotexist.com" alt="">
                        </div>
                        <div class="col-md-10 bg-dark rounded p-2">
                            <h5>name</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quidem delectus illum
                                provident obcaecati a culpa esse vero totam, et ipsam? Laboriosam natus explicabo,
                                facere id ab sint eos eius.</p>
                        </div>

                    </div> -->


                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'

export default {
    setup() {
        const commentData = ref({})
        const route = useRoute()
        watchEffect(async () => {
            try {
                await eventsService.getEvent(route.params.id)
                await commentsService.getEventComments(route.params.id)
            } catch (error) {
                Pop.error(error)
            }

        })
        return {
            commentData,
            event: computed(() => AppState.activeEvent),
            comment: computed(() => AppState.comment),
            ticket: computed(() => AppState.ticket),
            attendee: computed(() => AppState.Attendee.find(a => AppState.account.id == a.accountId)),
            // NOTE create a computed that tries to find a ticket in our AppState where the AppState.account.id == ticket.accountId. After that, render your button with a v-if if they do not have a ticket
            async createComment() {
                try {
                    //NOTE passing along the eventId with the comment because of the route which grabs it from the url so it knows what comment it belongs too
                    commentData.value.eventId = route.params.id
                    await commentsService.createComment(commentData.value)
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, 'error')
                }
            },

            async createTicket() {
                try {
                    // const attending = AppState.Attendee.find(a => a.eventId == route.params.id)
                    // if (attending) {
                    //     Pop.toast('Already Attending')
                    // }
                    await eventsService.createTicket(route.params.id)
                } catch (error) {
                    logger.log(error)
                    Pop.toast(message.error, 'error')
                }
            },

            formatDate(rawDate) {
                let time = new Date(rawDate)
                let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
                let year = time.getUTCFullYear()
                return `${month} ${year}`
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>
