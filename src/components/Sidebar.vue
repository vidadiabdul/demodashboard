<template>
  <v-navigation-drawer app color="#1C444D">
    <v-list>
      <v-list-item height="85"><v-img :src="logo" max-width="145" /></v-list-item>
      <v-list-item 
        v-for="item in menuItems"
        :key="item.title"
        link
        @click="navigate(item.route)"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/ae.svg";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const router = useRouter();

    const menuItems = [
      { title: "Home", icon: "mdi-widgets-outline", route: "/" },
      { title: "Guides", icon: "mdi-note-text-outline", route: "/guides" },
      { title: "Profile", icon: "mdi-account-outline", route: "/profile" },
    ];

    const navigate = (route: string) => {
      router.push(route);
    };

    return {
      menuItems,
      navigate,
      logo
    };
  },
});
</script>

