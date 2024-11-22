<template>
  <v-row>
    <v-col cols="12" lg="12" md="6">
      <v-card class="mx-auto pa-4" variant="flat">
        <template v-slot:title>
          <span v-if="user.fullname">{{ user.fullname }}</span>
          <v-skeleton-loader
            v-else
            elevation="0"
            min-width="80"
            width="150"
            height="20"
          ></v-skeleton-loader>
        </template>
        <template v-slot:subtitle>
          <span v-if="user.fullname">Manager</span>
          <v-skeleton-loader
            v-else
            class="mt-3"
            elevation="0"
            min-width="70"
            width="90"
            height="15"
          ></v-skeleton-loader>
        </template>
        <template v-slot:prepend>
          <v-avatar size="x-large">
            <v-img
              v-if="user.avatar"
              :alt="user.fullname"
              :src="`https://naturepulse.xyz/${user.avatar}`"
            ></v-img>
            <v-skeleton-loader v-else type="avatar"></v-skeleton-loader>
          </v-avatar>
        </template>
      </v-card>
    </v-col>
  </v-row>
  <v-card class="my-4 pa-4" elevation="0">
    <v-card-item>
      <v-card-title>Şəxsi məlumatlar</v-card-title>
    </v-card-item>
    <v-row lines="two">
      <v-col cols="12" lg="6" md="6"
        ><v-list-item title="Elektron poçt" :subtitle="user.email"></v-list-item
      ></v-col>
      <v-col cols="12" lg="6" md="6"
        ><v-list-item title="Əlaqə nömrəsi" :subtitle="user.phone"></v-list-item
      ></v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/userStore";
import { computed, onMounted } from "vue";
export default {
  setup() {
    const userStore = useUserStore();
    const user = computed(() => ({
      fullname: userStore.user?.fullname,
      avatar: userStore.user?.avatar,
      phone: userStore.user?.phone,
      email: userStore.user?.email,
    }));

    onMounted(() => {
      if (userStore.token) {
        userStore.fetchUserData();
      }
    });

    return { user };
  },
};
</script>
