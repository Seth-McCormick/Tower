<template>

    <div class="row mt-2">
        <div class="col-md-2">

            <img class="profile-img" :src="comment.creator.picture" alt="">
        </div>
        <div class="col-md-10 bg-dark rounded p-2">
            <h5>{{ comment.creator.name }}</h5>
            <p>{{ comment.body }}</p>
        </div>

    </div>

</template>


<script>


export default {
    props: { comment: { type: Object, required: true } },
    setup() {
        return {

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