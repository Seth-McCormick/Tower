<template>
    <div class="container-fluid bg-dark">

        <div class="col-md-12  mt-3 d-flex bg-secondary rounded justify-content-around ">
            <div class="col-md-4">
                <img class="img-fluid p-3" :src="event.coverImg" alt="">
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-between mt-3">
                    <h2>{{ event.name }}</h2>
                    <b>{{ event.startDate }}</b>
                </div>
                <div class="d-flex justify-content-between mt-3 ">
                    <h4>{{ event.location }}</h4>
                    <b>startTime</b>
                </div>
                <p class="text-center mt-4">{{ event.description }}</p>
                <div class="d-flex justify-content-between mt-4">
                    <b>{{ event.capacity }} Spots Left!</b>
                    <button class="btn btn-warning p-1 m-3">Attend</button>
                </div>
            </div>
        </div>


        <div class="mt-4">
            See who is Attending
            <div class="col-md-12">
                <div class="col-md-11 bg-secondary">
                    people attending
                </div>
            </div>
        </div>
        <div class="row justify-content-center">

            <div class="col-md-8 mt-5">
                What are people Saying
                <div class="col-md-12 bg-secondary p-3">
                    <form action="">
                        <textarea class="form-control" placeholder="Add a Comment..." v-model="commentData.body" name=""
                            id="" cols="30" rows="5"></textarea>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-success m-2" @click="createComment">Post</button>
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
import { computed, onMounted, ref } from 'vue'
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
        onMounted(async () => {
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

            async createComment() {
                try {
                    //NOTE passing along the eventId with the comment because of the route which grabs it from the url so it knows what comment it belongs too
                    commentData.value.eventId = route.params.id
                    await commentsService.createComment(commentData.value)
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