<template>
    <div class="col-3 m-2 p-0 border selectable" @click="selectEvent">
        <div class="col-md-12 img-fluid " :style="{ 'background-image': `url(${event.coverImg})` }">
            <!-- <img :src="event.coverImg" alt=""> -->
            <div class="col-md-12">
                <h4>{{ event.name }}</h4>
                <b>{{ event.location }}</b>
                <b>{{ event.startDate }}</b>
                <p class="text-end">{{ event.capacity }} spots left</p>
            </div>
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
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>