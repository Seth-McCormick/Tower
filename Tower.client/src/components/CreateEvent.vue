<template>
    <form action="">
        <input class="form-control mt-2" placeholder="Name..." type="text">
        <input class="form-control mt-2" placeholder="Location..." type="text">
        <input class="form-control mt-2" placeholder="Image..." type="text">
        <input class="form-control mt-2" placeholder="Date" type="date">
        <input class="form-control mt-2" placeholder="Capacity..." type="text">
        <textarea class="form-control mt-2" placeholder="Add a Description..." cols="30" rows="5"></textarea>
        <button class="btn btn-success d-flex mt-3" @click="createEvent">Create</button>
    </form>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
</style>



