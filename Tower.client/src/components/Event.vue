<template>

    <div class="col-3 m-2 p-0 border rounded selectable" @click="selectEvent">
        <!-- NOTE put additional properties on here to show if an event is cancelled/has no capacity (v-if) -->
        <div class="col-md-12 img-fluid " :style="{ 'background-image': `url(${event.coverImg})` }">
            <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-md-12  p-2">
            <h4>{{ event.name }}</h4>
            <div>
                <b>{{ event.location }}</b>
            </div>
            <b>{{ formatDate(event.startDate) }}</b>
            <p class="text-end">{{ event.capacity }} spots left</p>
        </div>
    </div>
</template>


<script>
import { useRouter } from 'vue-router'



export default {
    props: { event: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            selectEvent() {
                router.push({ name: 'EventDetails', params: { id: props.event.id } })
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