<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
        <div v-if="account.picture">
          <img :src="account.picture" alt="account photo" height="100" class="rounded m-3" />
          <div>
            <span class="mx-3 text-success lighten-30">{{ account.name }}</span>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'Home' }" class=" text-success lighten-30 selectable">
        <div class="mt-3">
          Home
        </div>
      </router-link>
      <router-link :to="{ name: 'Account' }" class=" text-success lighten-30 selectable mt-3">
        <div class="mt-3">
          Account
        </div>
      </router-link>

      <div>

        <div class="btn border bg-success rounded mt-3" data-bs-toggle="modal" data-bs-target="#modelId">
          Create Event
        </div>
      </div>


      <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark">Create Event</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <CreateEvent />
            </div>

          </div>
        </div>
      </div>

      <div class="btn border bg-danger rounded my-3" @click="logout">
        <i class="mdi mdi-logout"></i>
        logout
      </div>

    </div>
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
      async createEvent() {

      }
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
