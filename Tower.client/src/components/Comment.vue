<template>

    <div class="row mt-2">
        <div class="col-md-2">

            <img class="profile-img" :src="comment.creator.picture" alt="">
        </div>
        <div class="col-md-10 bg-dark rounded p-2">
            <div class="d-flex justify-content-between">
                <h5>{{ comment.creator.name }}</h5>
                <i class="mdi mdi-delete selectable" v-if="comment.creatorId == account.id" title="Delete Comment"
                    @click.prevent="deleteComment"></i>
            </div>
            <p>{{ comment.body }}</p>
        </div>

    </div>

</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'



export default {
    props: { comment: { type: Object, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deleteComment() {
                try {
                    await commentsService.deleteComment(props.comment.id)
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
.profile-img {
    height: 100px;
    width: 100px;
    border-radius: 50em;
}
</style>