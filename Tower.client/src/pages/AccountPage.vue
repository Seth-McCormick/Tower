<template>

</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    // have an onmounted/watcheffect that goes and gets all of my events/tickets
    return {
      account: computed(() => AppState.account)

    }
  }
}
</script>

<style scoped>
</style>
