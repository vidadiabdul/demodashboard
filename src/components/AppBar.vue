<template>
  <v-app-bar app elevation="0">
    <v-app-bar-title>
      <div class="d-flex align-center text-body-1">
        Xoş gördük,&nbsp;<span v-if="userName">{{ userName }}!</span>
        <v-skeleton-loader
          v-else
          class="ms-2"
          elevation="0"
          min-width="80"
          width="120"
          height="20px"
        ></v-skeleton-loader>
      </div>
    </v-app-bar-title>
    <v-btn @click="handleLogout" color="error">Logout</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
export default {
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const userName = computed(() => userStore.user?.fullname);

    const handleLogout = () => {
      authStore.logout();
      window.location.href = "/login";
    };

    onMounted(() => {
      if (userStore.token) {
        userStore.fetchUserData();
      }
    });

    return { userName, handleLogout };
  },
};
</script>
